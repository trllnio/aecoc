# IFCO TaaS — Demo Digital Product Passport · AECOC Valencia 2026

Demo estática que simula la plataforma **TaaS (Tracking as a Service)** de IFCO para el evento **AECOC Valencia 2026**.

Los visitantes del stand escanean un QR y acceden a esta web, donde pueden ver el recorrido real de los productos a lo largo de la cadena de suministro — el **Digital Product Passport** — sobre un mapa interactivo con las rutas por carretera entre orígenes (productores) y destino (Palau de Congressos de València).

## Cómo probar en local

No requiere build ni dependencias. Solo un servidor estático:

```bash
python3 -m http.server 8000
```

Y abre [http://localhost:8000](http://localhost:8000) en el navegador.

> Cualquier servidor estático sirve (`npx serve`, `live-server`, etc.). No abras `index.html` con `file://` directamente porque algunos navegadores bloquean fetch de `data.js`/`app.js` por CORS.

## Cómo desplegar

Es 100% estático, así que puedes subirlo a cualquier hosting:

- **GitHub Pages** — ya configurado vía `.github/workflows/static.yml`. Cada push a `main` despliega automáticamente.
- **Cloudflare Pages** / **Netlify** / **Vercel** — conecta el repo, sin build command, output dir = `/`.
- **AWS S3 + CloudFront** — sube los archivos a un bucket configurado como sitio estático.

## Estructura de archivos

| Archivo | Descripción |
|---|---|
| `index.html` | Página principal. Estructura, estilos y layout completo. Carga Leaflet (mapa) y los scripts de la demo. |
| `app.js` | Lógica de la demo: mapa, paneles, vista detalle de cada device, gráfico de temperatura y animación del recorrido. |
| `data.js` | Datos editables: `SITES`, `PRODUCTS`, `DEVICES`, polylines `ROUTE_NIJAR_TO_VALENCIA` y `ROUTE_ELEJIDO_TO_VALENCIA` (generadas con OSRM), journey y temperaturas. |
| `ifco-logo.svg` | Logo de IFCO. |
| `.github/workflows/static.yml` | Workflow de GitHub Actions que despliega a GitHub Pages en cada push a `main`. |

## Flujo de usuario en la feria

1. El visitante escanea el QR del stand → abre la web → ve el mapa con los 3 sites.
2. Hace clic en el site de AECOC (badge "11" de devices) → se abre el panel lateral con la lista de cajas.
3. Clica una caja → entra al detalle (info de producto, foto, gráfico de temperatura, historial del recorrido).
4. Desde el panel del device puede pulsar **"Ver ruta"** para dibujar la polyline desde el origen.

## Stack

- [Leaflet](https://leafletjs.com/) para el mapa.
- Rutas reales por carretera generadas con la API pública de [OSRM](https://project-osrm.org/).
- HTML + CSS + JS vanilla. Cero dependencias de build.
