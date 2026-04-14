import puppeteer from 'puppeteer';
import fs from 'fs';

async function extraerImagen(url) {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
  const imagen = await page.evaluate(() => {
    // Agarrar la primera imagen principal del producto
    const selectors = [
      '.ui-pdp-image',
      'figure.ui-pdp-gallery__figure img',
      '.ui-pdp-gallery img',
      'img.ui-pdp-image'
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.src && el.src.startsWith('http')) return el.src;
    }
    return null;
  });
  await browser.close();
  return imagen;
}

// URLs a procesar — agregar todas las que quieras acá:
const urls = [
  { nombre: 'AGUA S/G VILLAVICENCIO 1.5L', url: 'https://www.mercadolibre.com.ar/agua-mineral-villavicencio-15-lt-sin-gas-pack-x6-unidades/up/MLAU3082021424' },
  { nombre: 'COCA COLA ORIGINAL 600ML',    url: 'https://www.mercadolibre.com.ar/gaseosa-coca-cola-sabor-original-600-ml/p/MLA55891358' },
];

(async () => {
  const resultados = [];

  for (const item of urls) {
    console.log(`Procesando: ${item.nombre}`);
    const img = await extraerImagen(item.url);
    console.log(img ? `✅ ${img}` : '❌ No encontrada');
    resultados.push({ nombre: item.nombre, imagen: img });
  }

  fs.writeFileSync('./imagenes_manuales.json', JSON.stringify(resultados, null, 2));
  console.log('Listo → imagenes_manuales.json');
})();
