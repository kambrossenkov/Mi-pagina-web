'use strict';
/**
 * inyectar_imagenes.js
 * Lee imagenes_encontradas.json e inyecta las URLs en kiosco-app (3).html
 */
const fs = require('fs');

if (!fs.existsSync('./imagenes_encontradas.json')) {
  console.error('ERROR: Falta imagenes_encontradas.json. Correr primero: node buscar_imagenes_api.js');
  process.exit(1);
}

const imagenes = JSON.parse(fs.readFileSync('./imagenes_encontradas.json', 'utf8'));
const mapa = {};
imagenes.forEach(item => {
  if (item.imagen) mapa[item.nombre.trim().toUpperCase()] = item.imagen;
});
console.log(`Imágenes en el mapa: ${Object.keys(mapa).length}`);

const HTML = './kiosco-app (3).html';
if (!fs.existsSync(HTML)) { console.error('ERROR: No se encontró kiosco-app (3).html'); process.exit(1); }

let html = fs.readFileSync(HTML, 'utf8');

// Backup
const backup = './kiosco-app (3)_pre_imagenes.html';
if (!fs.existsSync(backup)) {
  fs.copyFileSync(HTML, backup);
  console.log(`Backup -> ${backup}`);
}

let n = 0, noEnc = [];

// Reemplaza: { name: "NOMBRE", image: "", price:
html = html.replace(/\{ name: "([^"]+)", image: "", price:/g, (match, nombre) => {
  const clave = nombre.trim().toUpperCase();
  const img = mapa[clave];
  if (img) { n++; return `{ name: "${nombre}", image: "${img}", price:`; }
  noEnc.push(nombre);
  return match;
});

fs.writeFileSync(HTML, html, 'utf8');

console.log(`\n${'='.repeat(48)}`);
console.log(`Imágenes inyectadas en el HTML: ${n}`);
console.log(`Productos que siguen sin imagen: ${[...new Set(noEnc)].length}`);
console.log(`${'='.repeat(48)}`);
if (noEnc.length) {
  fs.writeFileSync('./sin_imagen_final.txt', [...new Set(noEnc)].join('\n'), 'utf8');
  console.log('Sin imagen -> sin_imagen_final.txt');
}
console.log(`Archivo actualizado: ${HTML}`);
