# INSTRUCCIONES PARA CLAUDE CODE — IMÁGENES VÍA API

## Cómo funciona

En lugar de scraping con Puppeteer, usamos **2 APIs públicas gratuitas**:

| API | Cómo busca | Cobertura |
|-----|-----------|-----------|
| **Open Food Facts** | Por código EAN exacto | Excelente para productos con código de barras |
| **MercadoLibre** | Por EAN o por nombre | Cubre lo que OFF no tiene |

No requiere navegador, no hay bloqueos, los 326 productos se resuelven en ~2 minutos.

---

## Pasos

### 1. Copiar los scripts

Copiar estos 2 archivos a la carpeta del proyecto:
```
Mi pagina web/Carpeta_con_codigos_de_los_sitios_webs/
  ├── buscar_imagenes_api.js       ← paso 1: busca imágenes
  ├── inyectar_imagenes.js         ← paso 2: actualiza el kiosco
  ├── stock_kiosco_categorias.xlsx ← ya existe
  └── kiosco-app (3).html          ← ya existe
```

### 2. Instalar dependencias

```bash
cd "Mi pagina web/Carpeta_con_codigos_de_los_sitios_webs"
npm init -y
npm install xlsx
```
> `fetch` ya viene incluido en Node.js 18+. Verificar con `node --version`.
> Si la versión es menor a 18, instalar también: `npm install node-fetch`
> y agregar al inicio del script: `const fetch = require('node-fetch');`

### 3. Buscar imágenes

```bash
node buscar_imagenes_api.js
```

Verás el progreso en tiempo real:
```
[001/326] AGUA C/G VILLAVICENCIO 1.5L              ✅ OpenFoodFacts
[002/326] AGUA S/G VILLA DEL SUR 2.25              ✅ MercadoLibre-EAN
[003/326] ALFAJOR GULA BLANCO                      ✅ MercadoLibre-Nombre
[004/326] CELULOSA FUMANCHU                        ❌ No encontrado
...
```

Genera: `imagenes_encontradas.json` y `sin_imagen.txt`

### 4. Inyectar en el kiosco

```bash
node inyectar_imagenes.js
```

Genera: `kiosco-app-actualizado.html`

### 5. Verificar y reemplazar

Abrir `kiosco-app-actualizado.html` en el navegador.
Si todo está bien, reemplazar el archivo original.

---

## Si hay productos sin imagen en sin_imagen.txt

Para esos productos específicos, buscá manualmente en:
- `https://www.cotodigital.com.ar` → buscá el nombre del producto → clic derecho en la imagen → "Copiar dirección de imagen"
- `https://www.mercadolibre.com.ar` → ídem

Luego editá `imagenes_encontradas.json` y completá la propiedad `"imagen"` de esos productos.
Volvé a ejecutar `node inyectar_imagenes.js`.

---

## Resumen técnico

```
buscar_imagenes_api.js
  └─ Por cada producto del Excel:
       1. Open Food Facts API → https://world.openfoodfacts.org/api/v0/product/[EAN].json
       2. MercadoLibre API    → https://api.mercadolibre.com/sites/MLA/search?q=[EAN]
       3. MercadoLibre API    → https://api.mercadolibre.com/sites/MLA/search?q=[NOMBRE]
       → Guarda resultado en imagenes_encontradas.json

inyectar_imagenes.js
  └─ Lee imagenes_encontradas.json
  └─ Detecta automáticamente el formato del objeto producto en el HTML
  └─ Reemplaza imagen: "" por imagen: "https://..."
  └─ Guarda kiosco-app-actualizado.html
```
