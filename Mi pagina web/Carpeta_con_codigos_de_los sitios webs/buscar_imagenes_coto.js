/**
 * buscar_imagenes_coto.js  (v2 — sin Puppeteer)
 *
 * Estrategia por producto:
 *   1. Open Food Facts API  → busca por código de barras (EAN), muy rápido
 *   2. Jumbo VTEX API       → busca por nombre del producto
 *   3. Disco VTEX API       → fallback adicional por nombre
 *
 * Genera:
 *   imagenes_encontradas.json  → { codigo, nombre, imagen, fuente }[]
 *   sin_imagen.txt             → productos no encontrados
 *   imagenes_progress.json     → progreso automático (permite reanudar)
 */

'use strict';

const https = require('https');
const zlib  = require('zlib');
const XLSX  = require('xlsx');
const fs    = require('fs');

// ── LEER PRODUCTOS DEL EXCEL ─────────────────────────────────────────────────
const wb = XLSX.readFile('./stock_kiosco_categorias.xlsx');
const ws = wb.Sheets['TODOS LOS PRODUCTOS'];
const rows = XLSX.utils.sheet_to_json(ws);

const productos = rows.filter(r => {
  const det = r['DETALLE'];
  return r['CÓDIGO'] && det && typeof det === 'string' && !det.includes('▶');
});
console.log(`Total productos en Excel: ${productos.length}`);

// ── RETOMAR PROGRESO ─────────────────────────────────────────────────────────
const PROGRESS_FILE = './imagenes_progress.json';
let resultadosPrevios = [];
if (fs.existsSync(PROGRESS_FILE)) {
  try {
    resultadosPrevios = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    console.log(`Retomando: ${resultadosPrevios.length} ya procesados`);
  } catch (_) {}
}
const yaProcesados = new Set(resultadosPrevios.map(r => String(r.codigo).trim()));

// ── HELPERS HTTP ─────────────────────────────────────────────────────────────
function httpGet(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120',
        'Accept': 'application/json, */*',
        'Accept-Encoding': 'gzip, deflate',
        ...opts.headers,
      },
      timeout: opts.timeout || 12000,
    };

    https.get(url, options, res => {
      const chunks = [];

      const decode = res.headers['content-encoding'] === 'gzip'
        ? zlib.createGunzip()
        : res.headers['content-encoding'] === 'deflate'
          ? zlib.createInflate()
          : null;

      const stream = decode ? res.pipe(decode) : res;
      stream.on('data', d => chunks.push(d));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      stream.on('error', reject);
      res.on('error', reject);
    }).on('error', reject).on('timeout', () => reject(new Error('timeout')));
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── FUENTE 1: OPEN FOOD FACTS (por EAN) ─────────────────────────────────────
async function buscarOpenFoodFacts(codigo) {
  const clean = String(codigo).trim().replace(/[^0-9]/g, '');
  if (!clean || clean.length < 6) return null;

  try {
    const url = `https://world.openfoodfacts.org/api/v2/product/${clean}.json?fields=product_name,image_front_url,image_url`;
    const text = await httpGet(url, { headers: { 'User-Agent': 'KioscoApp/1.0 (contacto@kiosco.ar)' } });
    const json = JSON.parse(text);
    if (json.status !== 1) return null;
    return json.product?.image_front_url || json.product?.image_url || null;
  } catch {
    return null;
  }
}

// ── FUENTE 2: JUMBO VTEX (por nombre) ────────────────────────────────────────
async function buscarJumboAPI(nombre) {
  try {
    // Limpiar el nombre para la búsqueda
    const query = nombre
      .replace(/\d+\s*(ML|GR|G|KG|L|CM|UNI|PUFFS)\b/gi, '')  // quitar medidas
      .replace(/[^a-zA-Z0-9ÁÉÍÓÚáéíóúÑñ\s]/g, ' ')
      .replace(/\s+/g, '+')
      .trim();

    const url = `https://www.jumbo.com.ar/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4`;
    const text = await httpGet(url);
    const json = JSON.parse(text);

    if (!Array.isArray(json) || json.length === 0) return null;

    // Tomar la imagen del primer resultado
    const img = json[0]?.items?.[0]?.images?.[0]?.imageUrl;
    return img || null;
  } catch {
    return null;
  }
}

// ── FUENTE 3: DISCO VTEX (por nombre) ────────────────────────────────────────
async function buscarDiscoAPI(nombre) {
  try {
    const query = nombre.replace(/\s+/g, '+');
    const url = `https://www.disco.com.ar/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4`;
    const text = await httpGet(url);
    const json = JSON.parse(text);
    if (!Array.isArray(json) || json.length === 0) return null;
    const img = json[0]?.items?.[0]?.images?.[0]?.imageUrl;
    return img || null;
  } catch {
    return null;
  }
}

// ── FUENTE 4: CARREFOUR VTEX (por nombre) ────────────────────────────────────
async function buscarCarrefourAPI(nombre) {
  try {
    const query = nombre.replace(/\s+/g, '+');
    const url = `https://www.carrefour.com.ar/api/catalog_system/pub/products/search/${encodeURIComponent(query)}?_from=0&_to=4`;
    const text = await httpGet(url);
    const json = JSON.parse(text);
    if (!Array.isArray(json) || json.length === 0) return null;
    const img = json[0]?.items?.[0]?.images?.[0]?.imageUrl;
    return img || null;
  } catch {
    return null;
  }
}

// ── BUSCAR IMAGEN PARA UN PRODUCTO ───────────────────────────────────────────
async function buscarImagen(producto) {
  const codigo = String(producto['CÓDIGO']).trim();
  const nombre = String(producto['DETALLE']).trim();

  // 1) Open Food Facts
  let img = await buscarOpenFoodFacts(codigo);
  if (img) return { img, fuente: 'OpenFoodFacts' };

  await sleep(100);

  // 2) Jumbo
  img = await buscarJumboAPI(nombre);
  if (img) return { img, fuente: 'Jumbo' };

  await sleep(100);

  // 3) Disco
  img = await buscarDiscoAPI(nombre);
  if (img) return { img, fuente: 'Disco' };

  await sleep(100);

  // 4) Carrefour
  img = await buscarCarrefourAPI(nombre);
  if (img) return { img, fuente: 'Carrefour' };

  return null;
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const resultados = [...resultadosPrevios];
  const sinImagen = [];

  const pendientes = productos.filter(
    p => !yaProcesados.has(String(p['CÓDIGO']).trim())
  );
  console.log(`Pendientes a procesar: ${pendientes.length}\n`);

  const LOTE = 4; // paralelo de 4 (sin Puppeteer podemos ir más rápido)

  for (let i = 0; i < pendientes.length; i += LOTE) {
    const lote = pendientes.slice(i, i + LOTE);

    const promesas = lote.map(async prod => {
      const nombre = String(prod['DETALLE']).trim();
      const codigo = String(prod['CÓDIGO']).trim();

      const resultado = await buscarImagen(prod);

      if (resultado) {
        process.stdout.write(`✅ [${resultados.length + 1}/${productos.length}] ${nombre} (${resultado.fuente})\n`);
        return { codigo, nombre, imagen: resultado.img, fuente: resultado.fuente };
      } else {
        process.stdout.write(`❌ [${resultados.length + 1}/${productos.length}] ${nombre}\n`);
        sinImagen.push(nombre);
        return { codigo, nombre, imagen: null, fuente: null };
      }
    });

    // Ejecutar lote secuencialmente para no saturar APIs
    for (const p of promesas) {
      resultados.push(await p);
    }

    // Guardar progreso
    if (resultados.length % 20 === 0 || i + LOTE >= pendientes.length) {
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(resultados, null, 2));
      const conImg = resultados.filter(r => r.imagen).length;
      const pct = Math.round(conImg / resultados.length * 100);
      console.log(`\n💾 Progreso: ${resultados.length}/${productos.length} | Con imagen: ${conImg} (${pct}%)\n`);
    }

    // Pequeña pausa entre lotes para no ser bloqueados
    if (i + LOTE < pendientes.length) await sleep(300);
  }

  // ── GUARDAR RESULTADOS FINALES ────────────────────────────────────────────
  fs.writeFileSync('./imagenes_encontradas.json', JSON.stringify(resultados, null, 2));

  const conImagen = resultados.filter(r => r.imagen).length;
  console.log('\n════════════════════════════════════════════════');
  console.log(`✅ Con imagen:  ${conImagen} / ${productos.length}`);
  console.log(`❌ Sin imagen: ${productos.length - conImagen} / ${productos.length}`);

  // Desglose por fuente
  const fuentes = {};
  resultados.filter(r => r.imagen).forEach(r => {
    fuentes[r.fuente] = (fuentes[r.fuente] || 0) + 1;
  });
  console.log('\nPor fuente:');
  Object.entries(fuentes).sort((a,b) => b[1]-a[1]).forEach(([f,n]) => console.log(`  ${f}: ${n}`));
  console.log('════════════════════════════════════════════════');

  if (sinImagen.length > 0) {
    fs.writeFileSync('./sin_imagen.txt', [...new Set(sinImagen)].join('\n'), 'utf8');
    console.log(`\nProductos sin imagen → sin_imagen.txt`);
  }
  console.log('Resultados → imagenes_encontradas.json');
}

main().catch(err => { console.error('Error fatal:', err); process.exit(1); });
