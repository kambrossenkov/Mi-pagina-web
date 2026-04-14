/**
 * inspeccionar_coto.js — inspecciona el HTML de Coto para encontrar el selector correcto
 */
const puppeteer = require('puppeteer');

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');

  // Buscar "alfajor block arcor" en Coto por nombre
  const url = 'https://www.cotodigital.com.ar/sitios/cdigi/categoria/_/N-dbv9vsZ1voyfiqZ1ccdupf?Ntk=product.sDisplayName&Ntt=alfajor+block+arcor&Nrpp=5';
  console.log('Navegando a Coto...');

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 25000 });

    // Obtener el título de la página
    const title = await page.title();
    console.log('Título:', title);

    // Listar todas las imágenes en la página con su src, clase, ancho y alto
    const imagenes = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt || '',
        className: img.className || '',
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        parentClass: img.parentElement?.className || '',
      })).filter(i => i.src && i.src.startsWith('http'));
    });

    console.log(`\nImágenes encontradas: ${imagenes.length}`);
    console.log('\nDetalles:');
    imagenes.forEach((img, i) => {
      console.log(`\n  [${i+1}]`);
      console.log(`    src: ${img.src.substring(0, 100)}`);
      console.log(`    alt: ${img.alt.substring(0, 50)}`);
      console.log(`    class: ${img.className}`);
      console.log(`    parentClass: ${img.parentClass}`);
      console.log(`    size: ${img.width}x${img.height}`);
    });

    // Mostrar también el HTML de los primeros 2 productos
    const productHtml = await page.evaluate(() => {
      const products = document.querySelectorAll('.product-plp, .product_pod, .product-container, [class*="product"]');
      return Array.from(products).slice(0, 2).map(el => el.outerHTML.substring(0, 500)).join('\n---\n');
    });

    if (productHtml) {
      console.log('\nHTML de productos:');
      console.log(productHtml);
    }

    // Snapshot del DOM para análisis
    const bodyHtml = await page.evaluate(() => document.body.innerHTML.substring(0, 3000));
    require('fs').writeFileSync('./coto_snapshot.html', bodyHtml);
    console.log('\nSnapshot guardado: coto_snapshot.html');

  } catch (e) {
    console.error('Error:', e.message);
  }

  // También probar Jumbo
  console.log('\n\n=== PROBANDO JUMBO ===');
  try {
    await page.goto('https://www.jumbo.com.ar/busca?q=alfajor+block+arcor', {
      waitUntil: 'domcontentloaded', timeout: 20000
    });
    await new Promise(r => setTimeout(r, 2000));

    const imgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).slice(0, 10).map(img => ({
        src: img.src?.substring(0, 100),
        alt: img.alt,
        class: img.className,
      }));
    });
    console.log('Imágenes Jumbo:');
    imgs.forEach((img, i) => console.log(`  [${i+1}] ${img.src} | ${img.alt} | ${img.class}`));
  } catch (e) {
    console.error('Error Jumbo:', e.message);
  }

  await browser.close();
}

main().catch(console.error);
