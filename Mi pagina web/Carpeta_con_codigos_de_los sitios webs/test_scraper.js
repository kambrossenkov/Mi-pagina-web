/**
 * test_scraper.js — prueba rápida con 3 productos
 */
const puppeteer = require('puppeteer');

const TEST_PRODUCTS = [
  { codigo: '7790040143654', nombre: 'ALFAJOR SIMPLE BLOCK', marca: 'ARCOR' },
  { codigo: '77905741',      nombre: 'ALFAJOR JORGITO NEGRO', marca: 'JORGITO' },
  { codigo: '7798286830016', nombre: 'COCA COLA ORIGINAL 600ML', marca: 'COCA COLA' },
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function newPage(browser) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', req => {
    if (['font', 'stylesheet', 'media'].includes(req.resourceType())) req.abort();
    else req.continue();
  });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');
  return page;
}

async function buscarCoto(browser, codigo, nombre) {
  const page = await newPage(browser);
  try {
    const urls = [
      `https://www.cotodigital.com.ar/sitios/cdigi/categoria/_/N-dbv9vsZ1voyfiqZ1ccdupf?Ntk=product.EAN&Ntt=${codigo}&Nrpp=5`,
      `https://www.cotodigital.com.ar/sitios/cdigi/categoria/_/N-dbv9vsZ1voyfiqZ1ccdupf?Ntk=product.sDisplayName&Ntt=${encodeURIComponent(nombre.toLowerCase())}&Nrpp=5`,
    ];
    for (const url of urls) {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 18000 });
      await sleep(800);
      const img = await page.evaluate(() => {
        const sels = ['.product-image img', '.atg_store_productImage img', 'img[src*="catalog/full"]', 'img[src*="CotoDigital"]'];
        for (const s of sels) {
          const el = document.querySelector(s);
          if (el?.src?.startsWith('http') && !el.src.includes('placeholder')) return el.src;
        }
        // Fallback: cualquier imagen grande
        const imgs = Array.from(document.querySelectorAll('img[src]'));
        const big = imgs.find(img => img.width > 80 && !img.src.includes('logo') && !img.src.includes('banner') && img.src.startsWith('http'));
        return big ? big.src : null;
      });
      if (img) { await page.close(); return { img, fuente: 'COTO' }; }
    }
    await page.close(); return null;
  } catch (e) { try { await page.close(); } catch(_) {} return null; }
}

async function buscarJumbo(browser, nombre) {
  const page = await newPage(browser);
  try {
    await page.goto(`https://www.jumbo.com.ar/busca?q=${encodeURIComponent(nombre)}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(1500);
    const img = await page.evaluate(() => {
      const el = document.querySelector('.shelf-item__image img, [data-testid="product-img"], .vtex-product-summary img');
      return el?.src?.startsWith('http') && !el.src.includes('placeholder') ? el.src : null;
    });
    await page.close();
    return img ? { img, fuente: 'JUMBO' } : null;
  } catch { try { await page.close(); } catch(_) {} return null; }
}

async function buscarCarrefour(browser, nombre) {
  const page = await newPage(browser);
  try {
    await page.goto(`https://www.carrefour.com.ar/search?q=${encodeURIComponent(nombre)}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(1500);
    const img = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="product-img"], .vtex-product-summary img, .product-image img');
      return el?.src?.startsWith('http') && !el.src.includes('placeholder') ? el.src : null;
    });
    await page.close();
    return img ? { img, fuente: 'CARREFOUR' } : null;
  } catch { try { await page.close(); } catch(_) {} return null; }
}

async function main() {
  console.log('Lanzando browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled', '--disable-dev-shm-usage'],
  });

  for (const prod of TEST_PRODUCTS) {
    console.log(`\n🔍 Buscando: ${prod.nombre} (código: ${prod.codigo})`);

    let res = await buscarCoto(browser, prod.codigo, prod.nombre);
    if (!res) res = await buscarJumbo(browser, prod.nombre);
    if (!res) res = await buscarCarrefour(browser, prod.nombre);

    if (res) {
      console.log(`  ✅ ${res.fuente}: ${res.img.substring(0, 100)}`);
    } else {
      console.log(`  ❌ No encontrada en ninguna fuente`);
    }
  }

  await browser.close();
  console.log('\n✅ Test completado');
}

main().catch(console.error);
