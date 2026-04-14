/**
 * BUSCADOR DE IMÁGENES v2 — PROYECTO KIOSCO
 * ------------------------------------------
 * Fuentes en orden de prioridad:
 *   1. Open Food Facts  (por EAN)
 *   2. Open25.com.ar    (por nombre — HTML simple, sin Puppeteer)
 *   3. MercadoLibre     (por EAN)
 *   4. MercadoLibre     (por nombre)
 *
 * También genera fix_imagenes_incorrectas.json para los productos
 * con imágenes equivocadas (ej: celular o luces GE en Cigarrillos)
 */

const XLSX = require('xlsx');
const fs   = require('fs');

// ── LEER PRODUCTOS DEL EXCEL ──────────────────────────────────
const wb      = XLSX.readFile('./stock_kiosco_categorias.xlsx');
const ws      = wb.Sheets['TODOS LOS PRODUCTOS'];
const allRows = XLSX.utils.sheet_to_json(ws);

const productos = allRows.filter(r =>
  r['CÓDIGO'] && r['DETALLE'] &&
  !String(r['DETALLE']).includes('▶')
);

console.log(`\n📦 Total productos a procesar: ${productos.length}\n`);

// ── HELPERS ───────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchText(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KioscoBot/1.0)' },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) return null;
    return await res.text();
  } catch { return null; }
}

async function fetchJSON(url) {
  const text = await fetchText(url);
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

// ── FUENTE 1: OPEN FOOD FACTS (por EAN) ──────────────────────
async function buscarOpenFoodFacts(ean) {
  if (!/^\d{8,13}$/.test(String(ean).trim())) return null;
  const data = await fetchJSON(
    `https://world.openfoodfacts.org/api/v0/product/${ean}.json`
  );
  if (!data || data.status !== 1) return null;
  const p = data.product;
  return p?.image_front_url || p?.image_url || null;
}

// ── FUENTE 2: OPEN25 (HTML scraping simple) ──────────────────
async function buscarOpen25(nombre) {
  const query = nombre
    .replace(/\d+(G|ML|L|KG)\b/gi, '')
    .replace(/\bX\d+\b/gi, '')
    .replace(/\s+/g, ' ').trim();

  const html = await fetchText(
    `https://tienda.open25.com.ar/search/?q=${encodeURIComponent(query)}`
  );
  if (!html) return null;

  // Las imágenes del CDN de Tienda Nube están en el HTML como og:image o data-src
  // Patrón 1: og:image meta tag (más confiable)
  const ogMatch = html.match(
    /<meta[^>]+property="og:image"[^>]+content="(https:\/\/acdn-us\.mitiendanube\.com\/stores\/006\/038\/294\/products\/[^"]+)"/
  );
  if (ogMatch) return ogMatch[1];

  // Patrón 2: src directo en img tag
  const srcMatch = html.match(
    /https:\/\/acdn-us\.mitiendanube\.com\/stores\/006\/038\/294\/products\/[^"'\s]+?-(?:480|1024)-(?:0|1024)\.webp/
  );
  if (srcMatch) return srcMatch[0].replace('-480-0.webp', '-1024-1024.webp');

  return null;
}

// ── FUENTE 3: MERCADOLIBRE (por EAN) ─────────────────────────
async function buscarMLporEAN(ean) {
  if (!/^\d{8,13}$/.test(String(ean).trim())) return null;
  const data = await fetchJSON(
    `https://api.mercadolibre.com/sites/MLA/search?q=${ean}&limit=3`
  );
  const item = (data?.results || []).find(
    i => i.thumbnail && !i.thumbnail.includes('default')
  );
  if (!item) return null;
  return item.thumbnail.replace('-I.jpg', '-O.jpg').replace('http://', 'https://');
}

// ── FUENTE 4: MERCADOLIBRE (por nombre) ──────────────────────
async function buscarMLporNombre(nombre) {
  const query = nombre
    .replace(/\d+(G|ML|L)\b/gi, '')
    .replace(/\bX\d+\b/gi, '')
    .replace(/\s+/g, ' ').trim();

  const data = await fetchJSON(
    `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query)}&limit=5`
  );
  const item = (data?.results || []).find(
    i => i.thumbnail && !i.thumbnail.includes('default')
  );
  if (!item) return null;
  return item.thumbnail.replace('-I.jpg', '-O.jpg').replace('http://', 'https://');
}

// ── FUNCIÓN PRINCIPAL POR PRODUCTO ───────────────────────────
async function obtenerImagen(prod) {
  const ean    = String(prod['CÓDIGO']).trim();
  const nombre = String(prod['DETALLE']).trim();

  let img, fuente;

  img = await buscarOpenFoodFacts(ean);
  if (img) return { img, fuente: 'OpenFoodFacts' };
  await sleep(150);

  img = await buscarOpen25(nombre);
  if (img) return { img, fuente: 'Open25' };
  await sleep(150);

  img = await buscarMLporEAN(ean);
  if (img) return { img, fuente: 'MercadoLibre-EAN' };
  await sleep(150);

  img = await buscarMLporNombre(nombre);
  if (img) return { img, fuente: 'MercadoLibre-Nombre' };

  return { img: null, fuente: null };
}

// ── MAIN ──────────────────────────────────────────────────────
async function main() {
  const resultados = [];
  const sinImagen  = [];
  const stats      = {};

  for (let i = 0; i < productos.length; i++) {
    const prod   = productos[i];
    const nombre = String(prod['DETALLE']).trim();
    const codigo = String(prod['CÓDIGO']).trim();

    process.stdout.write(
      `[${String(i+1).padStart(3,'0')}/${productos.length}] ${nombre.substring(0,45).padEnd(45)} `
    );

    const { img, fuente } = await obtenerImagen(prod);

    if (img) {
      stats[fuente] = (stats[fuente] || 0) + 1;
      process.stdout.write(`✅ ${fuente}\n`);
      resultados.push({ codigo, nombre, imagen: img, fuente });
    } else {
      process.stdout.write(`❌ No encontrado\n`);
      sinImagen.push({ codigo, nombre });
      resultados.push({ codigo, nombre, imagen: null, fuente: null });
    }

    if ((i + 1) % 50 === 0)
      fs.writeFileSync('./imagenes_progress.json', JSON.stringify(resultados, null, 2));

    await sleep(300);
  }

  // Guardar resultados
  fs.writeFileSync('./imagenes_encontradas.json', JSON.stringify(resultados, null, 2));
  fs.writeFileSync('./sin_imagen.txt',
    sinImagen.map(p => `${p.codigo} | ${p.nombre}`).join('\n')
  );

  const total = resultados.length;
  const con   = resultados.filter(r => r.imagen).length;

  console.log(`
════════════════════════════════════════════════
  RESULTADO FINAL
════════════════════════════════════════════════
  Total:                    ${total}
  Con imagen:               ${con} (${Math.round(con/total*100)}%)
  Sin imagen:               ${sinImagen.length}

  Por fuente:
    Open Food Facts:        ${stats['OpenFoodFacts']       || 0}
    Open25:                 ${stats['Open25']              || 0}
    MercadoLibre (EAN):     ${stats['MercadoLibre-EAN']    || 0}
    MercadoLibre (Nombre):  ${stats['MercadoLibre-Nombre'] || 0}

  Archivos:
    ✅ imagenes_encontradas.json
    📋 sin_imagen.txt
════════════════════════════════════════════════

▶ Siguiente paso: node inyectar_imagenes.js
`);
}

main().catch(console.error);
