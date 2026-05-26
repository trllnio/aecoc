/* ============================================================
   APP.JS — Lógica de la demo
   ============================================================ */

// ---------- STATE ----------
const state = {
  view: 'map',           // 'map' | 'device' | 'devices'
  currentDeviceId: null,
  currentSiteId: null,
  routeLine: null,
  highlightedMarker: null,
};

// ---------- MAP INIT ----------
const map = L.map('map', {
  zoomControl: true,
  attributionControl: true,
}).setView([39.5, -2.5], 6);

// Tiles tipo Google (CartoDB Voyager — el más parecido a Google Maps "estándar")
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
  subdomains: 'abcd',
  maxZoom: 20,
}).addTo(map);

// ---------- ICONS (helper para iconos SVG inline) ----------
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>',
  thermometer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>',
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="10" x2="10" y2="14"/><line x1="14" y1="10" x2="14" y2="14"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
  apple: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  hash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
  qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="21"/><line x1="18" y1="14" x2="21" y2="14"/><line x1="14" y1="17" x2="17" y2="17"/><line x1="17" y1="20" x2="21" y2="20"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  trendUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  trendDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>',
};

// ---------- SITE MARKERS & GEOFENCES ----------
const siteLayer = L.layerGroup().addTo(map);
const geofenceLayer = L.layerGroup().addTo(map);

function buildSiteIcon(devicesCount) {
  // Si el site tiene devices, mostramos el pin marrón del site + un cluster
  // lila pegado a la derecha con el número total (igual que la plataforma real).
  const purpleCluster = devicesCount > 0 ? `
    <div class="device-cluster-badge">
      <div class="icon-wrap">${ICONS.signal}</div>
      <div class="count">${devicesCount}</div>
    </div>
  ` : '';
  return L.divIcon({
    className: 'site-icon-wrap',
    html: `
      <div class="site-marker">
        <div class="icon-wrap">${ICONS.home}</div>
      </div>
      ${purpleCluster}
    `,
    iconSize: [devicesCount > 0 ? 80 : 38, 42],
    iconAnchor: [devicesCount > 0 ? 19 : 19, 38],
  });
}

function renderSites() {
  siteLayer.clearLayers();
  geofenceLayer.clearLayers();
  SITES.forEach(site => {
    const devicesHere = getDevicesAtSite(site.id);
    const marker = L.marker(site.coords, { icon: buildSiteIcon(devicesHere.length) });
    marker.on('click', () => openSitePanel(site.id));
    marker.addTo(siteLayer);

    // Geofence polygon (verde semi-transparente)
    L.polygon(site.geofence, {
      color: '#10b981',
      weight: 2,
      fillColor: '#10b981',
      fillOpacity: 0.15,
    }).addTo(geofenceLayer);
  });
}

// Los devices individuales NO se muestran como markers en el mapa.
// El cluster lila pegado al site ya representa a los 11 devices.
// Para inspeccionar uno individual: click en el site → lista → click en device.

renderSites();

// Encuadre inicial mostrando todos los sites
const bounds = L.latLngBounds(SITES.map(s => s.coords));
map.fitBounds(bounds, { padding: [80, 80] });

// ---------- SIDE PANEL ----------
const sidePanel = document.getElementById('sidePanel');
const sidePanelTitle = document.getElementById('sidePanelTitle');
const sidePanelBody = document.getElementById('sidePanelBody');
document.getElementById('sidePanelClose').addEventListener('click', closeSidePanel);

function openSidePanel() { sidePanel.classList.add('open'); }
function closeSidePanel() {
  sidePanel.classList.remove('open');
  clearRoute();
}

function openSitePanel(siteId) {
  const site = getSiteById(siteId);
  state.currentSiteId = siteId;
  clearRoute();

  const devices = getDevicesAtSite(siteId);
  const isHub = site.type === 'hub';
  const typeBadge = isHub
    ? `<span class="badge orange">${ICONS.home} Hub</span>`
    : `<span class="badge green">${ICONS.apple} Grower</span>`;

  sidePanelTitle.innerHTML = `${ICONS.home} ${site.name}`;
  sidePanelBody.innerHTML = `
    <div style="margin-bottom: 14px;">${typeBadge}</div>
    <div class="info-row stacked">
      <div class="label">Dirección</div>
      <div class="value">${site.address}</div>
    </div>
    <div class="info-row">
      ${ICONS.box}
      <div><span class="label">Dispositivos en el site:</span> <span class="value">${devices.length}</span></div>
    </div>
    ${devices.length > 0 ? `
      <h4 style="margin-top: 18px; margin-bottom: 10px; font-size: 14px; font-weight: 600;">Dispositivos</h4>
      <div>
        ${devices.map(d => renderDeviceListItem(d)).join('')}
      </div>
    ` : `
      <div style="margin-top: 18px; padding: 24px; text-align: center; background: #f9fafb; border-radius: 10px; color: #6b7280; font-size: 13px;">
        No hay dispositivos en este site.
      </div>
    `}
  `;

  // Vincular clicks de la lista: abre el panel resumen del device
  // (con "Ver ruta" y "Ver dispositivo"), no salta directo al detalle.
  sidePanelBody.querySelectorAll('[data-device-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = parseInt(el.dataset.deviceId, 10);
      openDevicePanelFromMap(id);
    });
  });

  openSidePanel();
  // Centrar y hacer zoom al site para ver geofence
  map.flyTo(site.coords, 17, { duration: 0.5 });
}

function renderDeviceListItem(d) {
  const product = getProductOf(d);
  return `
    <div class="device-list-item" data-device-id="${d.id}">
      <div class="device-icon">${ICONS.signal}</div>
      <div class="device-info">
        <div class="device-name">${d.name}</div>
        <div class="device-sub">${d.mac}</div>
        <div class="device-badges">
          <span class="badge gray">${product.container}</span>
          <span class="badge green">${ICONS.check} Activo</span>
          <span class="badge green">${ICONS.battery} Bueno</span>
        </div>
      </div>
    </div>
  `;
}

function openDevicePanelFromMap(deviceId) {
  const d = getDeviceById(deviceId);
  const product = getProductOf(d);
  state.currentDeviceId = deviceId;

  // Mostramos el link "Volver" si venimos del site (siempre que haya un site abierto previamente)
  const backLink = state.currentSiteId
    ? `<button class="panel-back-link" id="btnBackToSite">${ICONS.back} Volver a dispositivos del site</button>`
    : '';

  sidePanelTitle.innerHTML = `${ICONS.signal} ${d.name}<br><span style="font-size: 12px; color: #6b7280; font-weight: 400;">(${d.mac})</span>`;
  sidePanelBody.innerHTML = `
    ${backLink}
    <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">
      <span class="badge gray">${ICONS.apple} ${product.container}</span>
      <span class="badge green">${ICONS.check} Activo</span>
      <span class="badge green">${ICONS.battery} Bueno</span>
    </div>
    <div class="info-row">${ICONS.clock}<div><span class="label">Última vista:</span> <span class="value">hace 1 minuto</span></div></div>
    <div class="info-row">${ICONS.map}<div><span class="label">Últimas coords:</span> <span class="value">${d.position[0].toFixed(7)}, ${d.position[1].toFixed(7)}</span></div></div>
    <div class="info-row">${ICONS.pin}<div><span class="label">Fuente de ubicación:</span> <span class="value">GPS</span></div></div>
    <div class="info-row">${ICONS.thermometer}<div><span class="value" style="color: #16a34a; font-weight: 600;">${d.tempSeries[d.tempSeries.length - 1].avg.toFixed(2)} °C</span></div></div>
    <div style="font-size: 11px; color: #6b7280; margin-top: -4px; margin-left: 26px;">Actualizado: 26 May 2026, 11:18</div>

    <div class="panel-actions">
      <button class="btn" id="btnShowDevice">${ICONS.signal} Ver dispositivo</button>
      <button class="btn primary" id="btnShowRoute">${ICONS.route} Ver ruta</button>
    </div>
  `;
  document.getElementById('btnShowDevice').addEventListener('click', () => goToDeviceDetail(d.id));
  document.getElementById('btnShowRoute').addEventListener('click', () => drawRoute(d.id));
  const backBtn = document.getElementById('btnBackToSite');
  if (backBtn) backBtn.addEventListener('click', () => openSitePanel(state.currentSiteId));
  openSidePanel();
}

// ---------- RUTAS EN EL MAPA ----------
function drawRoute(deviceId) {
  clearRoute();
  const d = getDeviceById(deviceId);
  const route = getRouteFor(d);
  state.routeLine = L.polyline(route, {
    color: '#ef4444',
    weight: 4,
    opacity: 0.9,
    lineCap: 'round',
    lineJoin: 'round',
  }).addTo(map);

  // Marker resaltado en el destino
  map.fitBounds(state.routeLine.getBounds(), { padding: [60, 60] });
}
function clearRoute() {
  if (state.routeLine) { map.removeLayer(state.routeLine); state.routeLine = null; }
}

// ---------- DEVICE DETAIL VIEW ----------
const mapView = document.getElementById('mapView');
const deviceDetailView = document.getElementById('deviceDetailView');
const devicesListView = document.getElementById('devicesListView');

function showView(view) {
  state.view = view;
  mapView.classList.toggle('hidden', view !== 'map');
  deviceDetailView.classList.toggle('hidden', view !== 'device');
  devicesListView.classList.toggle('hidden', view !== 'devices');

  // Sidebar active state
  document.getElementById('navMap').classList.toggle('active', view === 'map');
  document.getElementById('navDevices').classList.toggle('active', view === 'devices' || view === 'device');

  // Forzar refresh del mapa cuando volvemos a él (Leaflet lo necesita)
  if (view === 'map') setTimeout(() => map.invalidateSize(), 50);
}

function goToDeviceDetail(deviceId) {
  state.currentDeviceId = deviceId;
  const d = getDeviceById(deviceId);
  const product = getProductOf(d);

  deviceDetailView.innerHTML = `
    <div class="breadcrumb">
      <a id="bcDevices">Devices</a> / ${d.name} (${d.mac})
    </div>
    <div class="detail-header">
      <div class="detail-title">
        <h1>${ICONS.signal} ${d.name} <span style="font-weight: 500; color: #6b7280; font-size: 18px;">(${d.mac})</span></h1>
        <span class="badge gray">${ICONS.apple} ${product.container}</span>
        <span class="badge green">${ICONS.check} Activo</span>
        <span class="badge green">${ICONS.battery} Bueno</span>
      </div>
      <div class="detail-actions">
        <button class="btn" id="btnViewOnMap">${ICONS.map} Ver en mapa</button>
        <button class="btn" id="btnBack">${ICONS.back} Volver</button>
      </div>
    </div>

    <div class="detail-summary">
      <div class="summary-row">${ICONS.clock}<span class="label">Última vista</span><span class="value">26 May 2026, 11:18</span></div>
      <div class="summary-row">${ICONS.pin}<span class="label">Última ubicación</span><span class="value"><span style="color: #6b7280; font-weight: 400; margin-right: 6px;">En site</span><span class="badge blue">${ICONS.home} AECOC Valencia</span></span></div>
      <div class="summary-row" style="grid-column: span 2; padding-left: 26px; margin-top: -6px;"><span style="color: #6b7280; font-size: 12px;">desde 26 May 2026, 08:30 — hace 3 horas</span></div>
    </div>

    <div class="tabs">
      <div class="tab active" data-target="section-resumen">${ICONS.map} Resumen</div>
      <div class="tab" data-target="section-detalles">${ICONS.info} Detalles</div>
      <div class="tab" data-target="section-insights">${ICONS.thermometer} Insights</div>
      <div class="tab" data-target="section-historial">${ICONS.clock} Historial</div>
    </div>

    <div id="section-resumen"></div>

    <div class="detail-grid" id="section-detalles">
      <div class="card">
        <h2>Detalles</h2>
        <div class="info-row">${ICONS.edit}<div><span class="label" style="min-width: 130px; display: inline-block;">Nombre:</span> <span class="value">${d.name}</span></div></div>
        <div class="info-row">${ICONS.cpu}<div><span class="label" style="min-width: 130px; display: inline-block;">MAC:</span> <span class="value">${d.mac}</span></div></div>
        <div class="info-row">${ICONS.hash}<div><span class="label" style="min-width: 130px; display: inline-block;">Tracker ID:</span> <span class="value">${'ab' + d.id.toString(16).padStart(4, '0')}-7f64-34d8-93bd-${d.mac.replace(/:/g, '').toLowerCase()}</span></div></div>
        <div class="info-row">${ICONS.hash}<div><span class="label" style="min-width: 130px; display: inline-block;">ID externo:</span> <span class="value" style="color: #9ca3af;">No definido</span></div></div>
        <div class="info-row">${ICONS.cpu}<div><span class="label" style="min-width: 130px; display: inline-block;">Tipo hardware:</span> <span class="value">Super Node</span></div></div>
        <div class="info-row">${ICONS.box}<div><span class="label" style="min-width: 130px; display: inline-block;">Contenedor:</span> <span class="value">${product.container} (Black Lift Lock)</span></div></div>
      </div>
      <div class="card">
        <h2>Telemetría</h2>
        <div class="info-row">${ICONS.alert}<div><span class="label" style="min-width: 140px; display: inline-block;">Alertas:</span> <span class="value">0</span></div></div>
        <div class="info-row">${ICONS.clock}<div><span class="label" style="min-width: 140px; display: inline-block;">Última vista:</span> <span class="value">26 May 2026, 11:18</span></div></div>
        <div class="info-row">${ICONS.thermometer}<div><span class="label" style="min-width: 140px; display: inline-block;">Última temperatura:</span> <span class="value" style="color: #16a34a; font-weight: 600;">${d.tempSeries[d.tempSeries.length - 1].avg.toFixed(2)} °C</span></div></div>
        <div class="info-row">${ICONS.pin}<div><span class="label" style="min-width: 140px; display: inline-block;">Fuente ubicación:</span> <span class="value">GPS</span></div></div>
        <div class="info-row">${ICONS.map}<div><span class="label" style="min-width: 140px; display: inline-block;">Coordenadas:</span> <span class="value">${d.position[0].toFixed(7)}, ${d.position[1].toFixed(7)}</span></div></div>
        <div class="info-row">${ICONS.battery}<div><span class="label" style="min-width: 140px; display: inline-block;">Batería:</span> <span class="value">Buena (87%)</span></div></div>
      </div>
    </div>

    <div class="card" style="margin-bottom: 16px;">
      <h2>Información adicional <span style="font-size: 12px; font-weight: 400; color: #6b7280; margin-left: 8px;">Actualizado: 25 May 2026, 08:00</span></h2>
      <div class="additional-info">
        <div class="additional-info-fields">
          <div class="field-block"><div class="field-label">Producto</div><div class="field-value">${product.name}</div></div>
          <div class="field-block"><div class="field-label">Variedad</div><div class="field-value">${product.variety}</div></div>
          <div class="field-block"><div class="field-label">Peso</div><div class="field-value">${product.weight}</div></div>
          <div class="field-block"><div class="field-label">Origen</div><div class="field-value">${product.origin}</div></div>
          <div class="field-block"><div class="field-label">Fecha de recogida</div><div class="field-value">${product.pickedAt}</div></div>
          <div class="field-block"><div class="field-label">Destino final</div><div class="field-value">${product.finalDestination}</div></div>
          <div class="field-block" style="grid-column: span 3;"><div class="field-label">Contenedor</div><div class="field-value">${product.container}</div></div>
        </div>
        <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
      </div>
    </div>

    <div class="temp-chart-wrap" id="section-insights">
      <h2>Insights · Temperatura</h2>
      <div class="temp-chart-subtitle">Últimos 7 días</div>
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="border-color: #22c55e;"></span> Media</div>
        <div class="legend-item"><span class="legend-dot" style="border-color: #ef4444;"></span> Máximo</div>
        <div class="legend-item"><span class="legend-dot" style="border-color: #a855f7;"></span> Mínimo</div>
        <div class="legend-item"><span class="legend-dot" style="border-color: #fca5a5;"></span> Umbral máx.: 30 °C</div>
        <div class="legend-item"><span class="legend-dot" style="border-color: #93c5fd;"></span> Umbral mín.: -10 °C</div>
      </div>
      <div id="tempChartContainer"></div>
    </div>

    <div class="card" id="section-historial">
      <h2>Historial del recorrido</h2>
      <div class="journey-list">
        ${d.journey.map(j => renderJourneyItem(j, d)).join('')}
      </div>
    </div>
  `;

  document.getElementById('btnBack').addEventListener('click', () => {
    showView('map');
    closeSidePanel();
  });
  document.getElementById('btnViewOnMap').addEventListener('click', () => {
    showView('map');
    closeSidePanel();
    map.flyTo(d.position, 18, { duration: 0.5 });
    setTimeout(() => openDevicePanelFromMap(d.id), 600);
  });
  document.getElementById('bcDevices').addEventListener('click', () => {
    renderDevicesList();
  });

  // Tab navigation: click → smooth scroll a la sección + marcar como activo
  const tabs = deviceDetailView.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        // Scroll dentro del contenedor scrollable (deviceDetailView)
        const containerTop = deviceDetailView.getBoundingClientRect().top;
        const targetTop = target.getBoundingClientRect().top;
        const offset = targetTop - containerTop + deviceDetailView.scrollTop - 16;
        deviceDetailView.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
      }
    });
  });

  // Pegamos los tabs al hacer scroll
  deviceDetailView.addEventListener('scroll', () => {
    const sections = ['section-resumen', 'section-detalles', 'section-insights', 'section-historial'];
    let activeIdx = 0;
    const containerTop = deviceDetailView.getBoundingClientRect().top;
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (!el) continue;
      const top = el.getBoundingClientRect().top - containerTop;
      if (top <= 80) activeIdx = i;
    }
    tabs.forEach((t, i) => t.classList.toggle('active', i === activeIdx));
  });

  // Expand/collapse para los items del journey que sean expandibles
  deviceDetailView.querySelectorAll('.journey-item.expandable .journey-row').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => {
      const item = row.closest('.journey-item');
      item.classList.toggle('expanded');
    });
  });

  renderTempChart(d);
  showView('device');
  window.scrollTo(0, 0);
  deviceDetailView.scrollTop = 0;
}

function renderJourneyItem(j, device) {
  const sites = j.siteLabel
    ? (j.siteLabel2
        ? `<span class="badge ${j.siteType === 'grower' ? 'green' : 'blue'}">${j.siteType === 'grower' ? ICONS.apple : ICONS.home} ${j.siteLabel}</span> <span style="color: #6b7280; margin: 0 4px;">a</span> <span class="badge blue">${ICONS.home} ${j.siteLabel2}</span>`
        : `<span class="badge ${j.siteType === 'grower' ? 'green' : 'blue'}">${j.siteType === 'grower' ? ICONS.apple : ICONS.home} ${j.siteLabel}</span>`)
    : '';
  const iconMap = { route: ICONS.route, info: ICONS.info, qr: ICONS.qr, check: ICONS.check };
  const status = {
    started: `<span class="badge purple">${ICONS.pin} Iniciada</span>`,
    finished: `<span class="badge green">${ICONS.pin} Finalizada</span>`,
    info: `<span class="badge yellow">${ICONS.info} Info</span>`,
    alert: `<span class="badge red">${ICONS.alert} Activa</span>`,
  }[j.type] || '';

  // Contenido expandible específico según el tipo de evento
  let expandedContent = '';
  if (j.expandable && device) {
    if (j.routeStats) {
      // Bloque de stats de temperatura durante el trayecto
      const s = j.routeStats;
      // Color del badge según si está dentro de threshold
      const finalNum = parseFloat(s.finalTemp);
      const inRange = finalNum >= s.thresholdMin && finalNum <= s.thresholdMax;
      const badgeColor = inRange ? 'green' : 'orange';
      expandedContent = `
        <div class="journey-expanded">
          <div class="journey-stats-grid">
            <div class="journey-stat-row">
              <div class="journey-stat-label">${ICONS.thermometer} Temperatura al cierre</div>
              <span class="badge ${badgeColor}" style="font-size: 13px; padding: 5px 12px;">${ICONS.thermometer} ${s.finalTemp} °C</span>
            </div>
            <div class="journey-stat-divider"></div>
            <div class="journey-stat-cells">
              <div class="journey-stat-cell">
                <div class="journey-stat-cell-label">${ICONS.trendUp} Máx.</div>
                <div class="journey-stat-cell-value" style="color: #ef4444;">${s.maxTemp} °C</div>
              </div>
              <div class="journey-stat-cell">
                <div class="journey-stat-cell-label">${ICONS.trendDown} Mín.</div>
                <div class="journey-stat-cell-value" style="color: #3b82f6;">${s.minTemp} °C</div>
              </div>
              <div class="journey-stat-cell">
                <div class="journey-stat-cell-label">Variación</div>
                <div class="journey-stat-cell-value" style="color: #1f2937;">${s.variation} °C</div>
              </div>
            </div>
            <div class="journey-stat-footnote">
              Umbral aceptable: <strong>${s.thresholdMin} °C – ${s.thresholdMax} °C</strong>. Todos los registros dentro del rango durante el trayecto.
            </div>
          </div>
        </div>
      `;
    } else {
      // Bloque de info de producto (Información del producto actualizada)
      const product = getProductOf(device);
      expandedContent = `
        <div class="journey-expanded">
          <div class="journey-expanded-header">
            <span class="badge gray" style="background: #fef3c7; color: #92400e;">${ICONS.info} Incluye información adicional</span>
          </div>
          <div class="journey-expanded-grid">
            <div class="journey-detail-section">
              <div class="journey-detail-title">Valores añadidos</div>
              <div class="journey-detail-list">
                <div class="journey-detail-row"><span class="journey-detail-key">Producto:</span> <span class="journey-detail-val">${product.name}</span></div>
                <div class="journey-detail-row"><span class="journey-detail-key">Variedad:</span> <span class="journey-detail-val">${product.variety}</span></div>
                <div class="journey-detail-row"><span class="journey-detail-key">Peso:</span> <span class="journey-detail-val">${product.weight}</span></div>
                <div class="journey-detail-row"><span class="journey-detail-key">Origen:</span> <span class="journey-detail-val">${product.origin}</span></div>
              </div>
            </div>
            <div class="journey-detail-section">
              <div class="journey-detail-title">Información de envío</div>
              <div class="journey-detail-list">
                <div class="journey-detail-row"><span class="journey-detail-key">Fecha de recogida:</span> <span class="journey-detail-val">${product.pickedAt}</span></div>
                <div class="journey-detail-row"><span class="journey-detail-key">Destino final:</span> <span class="journey-detail-val">${product.finalDestination}</span></div>
                <div class="journey-detail-row"><span class="journey-detail-key">Contenedor:</span> <span class="badge gray" style="font-size: 11px;">${product.container}</span></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  const expandToggle = j.expandable
    ? `<button class="journey-toggle" aria-label="Expandir">${ICONS.chevronDown}</button>`
    : '';

  return `
    <div class="journey-item ${j.type}${j.expandable ? ' expandable' : ''}">
      <div class="journey-row">
        <div class="journey-content">
          <div class="journey-title">
            ${iconMap[j.icon] || ICONS.info}
            <span>${j.title}</span>
            ${sites}
          </div>
          <div class="journey-meta">${ICONS.clock} ${j.timestamp}</div>
        </div>
        <div class="journey-right">
          ${status}
          ${expandToggle}
        </div>
      </div>
      ${expandedContent}
    </div>
  `;
}

// ---------- TEMP CHART (SVG inline) ----------
function renderTempChart(device) {
  const container = document.getElementById('tempChartContainer');
  const series = device.tempSeries;
  const W = 900, H = 280, PAD_L = 50, PAD_R = 20, PAD_T = 20, PAD_B = 40;
  const minY = -15, maxY = 35;
  const yScale = v => PAD_T + (1 - (v - minY) / (maxY - minY)) * (H - PAD_T - PAD_B);
  const xScale = i => PAD_L + (i / (series.length - 1)) * (W - PAD_L - PAD_R);

  // Background bands (umbrales)
  const yMax30 = yScale(30);
  const yMin10 = yScale(-10);

  // Polylines
  const avgPath = series.map((p, i) => `${xScale(i)},${yScale(p.avg)}`).join(' ');
  const maxPath = series.map((p, i) => `${xScale(i)},${yScale(p.max)}`).join(' ');
  const minPath = series.map((p, i) => `${xScale(i)},${yScale(p.min)}`).join(' ');

  // Y axis labels
  const yTicks = [-15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35];
  const yTickEls = yTicks.map(t => `
    <line x1="${PAD_L}" y1="${yScale(t)}" x2="${W - PAD_R}" y2="${yScale(t)}" stroke="#f3f4f6" stroke-width="1"/>
    <text x="${PAD_L - 8}" y="${yScale(t) + 4}" text-anchor="end" font-size="11" fill="#9ca3af">${t}</text>
  `).join('');

  // X axis labels (días)
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date('2026-05-26T11:18:00');
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  const xLabelEls = days.map((d, i) => {
    const x = PAD_L + (i / 6) * (W - PAD_L - PAD_R);
    const label = `${d.getDate()} ${['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][d.getMonth()]}`;
    return `<text x="${x}" y="${H - 16}" text-anchor="middle" font-size="11" fill="#6b7280">${label}</text>`;
  }).join('');

  container.innerHTML = `
    <svg class="temp-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
      <!-- Banda verde "safe" entre umbrales -->
      <rect x="${PAD_L}" y="${yMax30}" width="${W - PAD_L - PAD_R}" height="${yMin10 - yMax30}" fill="#dcfce7" opacity="0.5"/>
      <!-- Líneas de umbral -->
      <line x1="${PAD_L}" y1="${yMax30}" x2="${W - PAD_R}" y2="${yMax30}" stroke="#ef4444" stroke-dasharray="6,4" stroke-width="1.5"/>
      <line x1="${PAD_L}" y1="${yMin10}" x2="${W - PAD_R}" y2="${yMin10}" stroke="#3b82f6" stroke-dasharray="6,4" stroke-width="1.5"/>
      <!-- Grid Y -->
      ${yTickEls}
      <!-- Eje Y label -->
      <text x="12" y="${H / 2}" font-size="11" fill="#6b7280" transform="rotate(-90 12 ${H / 2})" text-anchor="middle">Temperatura (°C)</text>
      <!-- Polylines -->
      <polyline points="${maxPath}" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.9"/>
      <polyline points="${minPath}" fill="none" stroke="#a855f7" stroke-width="2" opacity="0.9"/>
      <polyline points="${avgPath}" fill="none" stroke="#22c55e" stroke-width="2.5"/>
      <!-- X labels -->
      ${xLabelEls}
      <!-- Eje X label -->
      <text x="${W / 2}" y="${H - 2}" font-size="11" fill="#6b7280" text-anchor="middle">Tiempo (días)</text>
    </svg>
  `;
}

// ---------- DEVICES LIST VIEW ----------
function renderDevicesList() {
  devicesListView.innerHTML = `
    <div class="detail-header">
      <div class="detail-title">
        <h1>${ICONS.signal} Dispositivos <span style="font-weight: 500; color: #6b7280; font-size: 18px;">(${DEVICES.length})</span></h1>
      </div>
    </div>
    <div class="card">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
        ${DEVICES.map(d => renderDeviceListItem(d)).join('')}
      </div>
    </div>
  `;
  devicesListView.querySelectorAll('[data-device-id]').forEach(el => {
    el.addEventListener('click', () => goToDeviceDetail(parseInt(el.dataset.deviceId, 10)));
  });
  showView('devices');
}

// ---------- NAV ----------
document.getElementById('navMap').addEventListener('click', () => {
  showView('map');
  closeSidePanel();
});
document.getElementById('navDevices').addEventListener('click', () => {
  renderDevicesList();
});
