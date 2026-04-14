/**
 * actualizar_imagenes_kiosco.js
 * Lee imagenes_encontradas.json y actualiza el HTML del kiosco
 * reemplazando image: "" por la URL real encontrada.
 *
 * Uso: node actualizar_imagenes_kiosco.js
 */

const fs = require('fs');

// ── LEER MAPA DE IMÁGENES ────────────────────────────────────────────────────
if (!fs.existsSync('./imagenes_encontradas.json')) {
  console.error('ERROR: No se encontró imagenes_encontradas.json');
  console.error('Ejecutá primero: node buscar_imagenes_coto.js');
  process.exit(1);
}

const imagenes = JSON.parse(fs.readFileSync('./imagenes_encontradas.json', 'utf8'));

// Construir mapa por nombre (uppercase) → url
const mapaImagenes = {};
imagenes.forEach(item => {
  if (item.imagen) {
    mapaImagenes[item.nombre.trim().toUpperCase()] = item.imagen;
  }
});

const totalConImagen = Object.keys(mapaImagenes).length;
console.log(`Imágenes disponibles en el mapa: ${totalConImagen}`);

// ── LEER EL HTML DEL KIOSCO ──────────────────────────────────────────────────
const HTML_FILE = './kiosco-app (3).html';
if (!fs.existsSync(HTML_FILE)) {
  console.error(`ERROR: No se encontró ${HTML_FILE}`);
  process.exit(1);
}

let contenido = fs.readFileSync(HTML_FILE, 'utf8');

// ── REEMPLAZAR image: "" POR LA URL REAL ─────────────────────────────────────
// El patrón en el archivo es:
//   { name: "NOMBRE DEL PRODUCTO", image: "", price: "...", agotado: false }
// Necesitamos reemplazar image: "" cuando el nombre matchea.

let reemplazos = 0;
let noEncontrados = [];

// Regex: captura el nombre del producto en la línea que tiene image: ""
const patron = /(\{ name: "([^"]+)", image: ")(")( , price:)/g;

// También manejar el formato sin espacio antes de coma
const patron2 = /(\{ name: "([^"]+)", image: "")( , price:)/g;

// El formato real es: { name: "...", image: "", price: "...", agotado: ... }
// Reemplazamos con una función que busca el nombre en el mapa
contenido = contenido.replace(
  /(\{ name: "([^"]+)", image: ""), price:/g,
  (match, prefix, nombre) => {
    const clave = nombre.trim().toUpperCase();
    if (mapaImagenes[clave]) {
      reemplazos++;
      return `{ name: "${nombre}", image: "${mapaImagenes[clave]}", price:`;
    } else {
      noEncontrados.push(nombre);
      return match;
    }
  }
);

// ── GUARDAR RESULTADO ────────────────────────────────────────────────────────
// Backup del original si no existe ya
const BACKUP = './kiosco-app (3)_pre_imagenes.html';
if (!fs.existsSync(BACKUP)) {
  fs.copyFileSync(HTML_FILE, BACKUP);
  console.log(`Backup guardado: ${BACKUP}`);
}

fs.writeFileSync(HTML_FILE, contenido, 'utf8');

// ── REPORTE ──────────────────────────────────────────────────────────────────
console.log('\n════════════════════════════════════════════════');
console.log(`✅ Imágenes actualizadas en el HTML: ${reemplazos}`);
console.log(`❌ Sin imagen (no encontrados):      ${noEncontrados.length}`);
console.log('════════════════════════════════════════════════');

if (noEncontrados.length > 0) {
  const lista = [...new Set(noEncontrados)]; // quitar duplicados
  fs.writeFileSync('./sin_imagen_final.txt', lista.join('\n'), 'utf8');
  console.log(`\nProductos que siguen sin imagen: sin_imagen_final.txt`);
  if (lista.length <= 20) {
    lista.forEach(n => console.log(`  - ${n}`));
  } else {
    lista.slice(0, 10).forEach(n => console.log(`  - ${n}`));
    console.log(`  ... y ${lista.length - 10} más`);
  }
}

console.log(`\nArchivo actualizado: ${HTML_FILE}`);
