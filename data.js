/* ============================================================
   DATOS DE LA DEMO TaaS - AECOC Valencia 2026
   Edita aquí libremente sin tocar app.js
   ============================================================ */

/* ---------- SITES ---------- */
// type: 'grower' | 'hub'
// geofence: array de [lat, lng] formando el polígono (lo dibuja Leaflet en verde)
const SITES = [
  {
    id: "site-nijar",
    name: "Grower Almería - Níjar",
    type: "grower",
    address: "Carretera Níjar la Cañada s/n, Almería",
    coords: [36.8433, -2.3948],
    geofence: [
      [36.8445, -2.3965],
      [36.8445, -2.3931],
      [36.8421, -2.3931],
      [36.8421, -2.3965],
    ],
  },
  {
    id: "site-elejido",
    name: "Grower Almería - El Ejido",
    type: "grower",
    address: "Paraje Diseminado Los Majales, 39 CP04700 El Ejido, Almería",
    coords: [36.7209, -2.8404],
    geofence: [
      [36.7221, -2.8421],
      [36.7221, -2.8387],
      [36.7197, -2.8387],
      [36.7197, -2.8421],
    ],
  },
  {
    id: "site-aecoc",
    name: "AECOC Valencia - Palau de Congressos",
    type: "hub",
    address: "Av. de les Corts Valencianes, 60, 46015 València",
    coords: [39.4962, -0.4021],
    geofence: [
      [39.4972, -0.4036],
      [39.4972, -0.4006],
      [39.4952, -0.4006],
      [39.4952, -0.4036],
    ],
  },
];

/* ---------- PRODUCTOS ---------- */
const PRODUCTS = {
  tomate: {
    name: "Tomate Pera",
    variety: "Heredero",
    origin: "Vicasol - El Ejido, Almería, ES",
    pickedAt: "27/05/2026",
    finalDestination: "AECOC Valencia",
    container: "IFCO BLL 6410",
    weight: "6 kg",
    targetTempMin: 3,
    targetTempMax: 6,
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
  },
  pimiento: {
    name: "Pimiento Verde Italiano",
    variety: "Delice",
    origin: "Vicasol - El Ejido, Almería, ES",
    pickedAt: "27/05/2026",
    finalDestination: "AECOC Valencia",
    container: "IFCO BLL 6410",
    weight: "5 kg",
    targetTempMin: 3,
    targetTempMax: 6,
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
  },
  pepino: {
    name: "Pepino Español",
    variety: "Ocaña",
    origin: "Vicasol - El Ejido, Almería, ES",
    pickedAt: "27/05/2026",
    finalDestination: "AECOC Valencia",
    container: "IFCO BLL 6410",
    weight: "5 kg",
    targetTempMin: 3,
    targetTempMax: 6,
    image:
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400&h=400&fit=crop",
  },
};

/* ---------- RUTAS REALES POR CARRETERA (generadas con OSRM) ---------- */
const ROUTE_NIJAR_TO_VALENCIA = [
  [36.8433, -2.3948],
  [36.846043, -2.388164],
  [36.847509, -2.382134],
  [36.851739, -2.374654],
  [36.855495, -2.346348],
  [36.868608, -2.340015],
  [36.8686, -2.31175],
  [36.865301, -2.269307],
  [36.869555, -2.230525],
  [36.888282, -2.214676],
  [36.926052, -2.209741],
  [36.942317, -2.195148],
  [36.950197, -2.169868],
  [36.954721, -2.126747],
  [36.973736, -2.090055],
  [36.994826, -2.06462],
  [37.007788, -2.05112],
  [37.021734, -2.043422],
  [37.038079, -2.037741],
  [37.048173, -2.044315],
  [37.063825, -2.053596],
  [37.087328, -2.062796],
  [37.093903, -2.052579],
  [37.111684, -2.025052],
  [37.130301, -2.011338],
  [37.142693, -1.994354],
  [37.145344, -1.964235],
  [37.162544, -1.946393],
  [37.177461, -1.933346],
  [37.199354, -1.908893],
  [37.222217, -1.896207],
  [37.251303, -1.899165],
  [37.278043, -1.910625],
  [37.30449, -1.951148],
  [37.338003, -1.965689],
  [37.354721, -1.971714],
  [37.373286, -1.959187],
  [37.389531, -1.962344],
  [37.409214, -1.955918],
  [37.428137, -1.922514],
  [37.458112, -1.88934],
  [37.485641, -1.860426],
  [37.541179, -1.816494],
  [37.560268, -1.819994],
  [37.569793, -1.807441],
  [37.585145, -1.785238],
  [37.633383, -1.741899],
  [37.660014, -1.717154],
  [37.690987, -1.709866],
  [37.690952, -1.679484],
  [37.701645, -1.643213],
  [37.709177, -1.609343],
  [37.726566, -1.560694],
  [37.737786, -1.532624],
  [37.744905, -1.498188],
  [37.768346, -1.454948],
  [37.798391, -1.425527],
  [37.82401, -1.409093],
  [37.852808, -1.399633],
  [37.882437, -1.361537],
  [37.907901, -1.317574],
  [37.941622, -1.269653],
  [37.974156, -1.248196],
  [37.985767, -1.259453],
  [38.021561, -1.288207],
  [38.058094, -1.289542],
  [38.092791, -1.302108],
  [38.11553, -1.268662],
  [38.132966, -1.266846],
  [38.164056, -1.303038],
  [38.200266, -1.322544],
  [38.250733, -1.327995],
  [38.310819, -1.304763],
  [38.356392, -1.262178],
  [38.396806, -1.243822],
  [38.438307, -1.254114],
  [38.475552, -1.218237],
  [38.542821, -1.139873],
  [38.573141, -1.073366],
  [38.604404, -1.044034],
  [38.652836, -1.035435],
  [38.696271, -1.008183],
  [38.71538, -0.994531],
  [38.724071, -0.938823],
  [38.760407, -0.896431],
  [38.803529, -0.887393],
  [38.827517, -0.889674],
  [38.844294, -0.844781],
  [38.855529, -0.819323],
  [38.881147, -0.760761],
  [38.881542, -0.748034],
  [38.944585, -0.641924],
  [38.993145, -0.582219],
  [39.023094, -0.553376],
  [39.041432, -0.552026],
  [39.072237, -0.541798],
  [39.103699, -0.529312],
  [39.132964, -0.524572],
  [39.14439, -0.529562],
  [39.160762, -0.523383],
  [39.190383, -0.497926],
  [39.250304, -0.475067],
  [39.308948, -0.443804],
  [39.354495, -0.425796],
  [39.385113, -0.39713],
  [39.436015, -0.373487],
  [39.450115, -0.406995],
  [39.495926, -0.419527],
  [39.492721, -0.406606],
  [39.4962, -0.4021],
];

const ROUTE_ELEJIDO_TO_VALENCIA = [
  [36.7209, -2.8404],
  [36.734497, -2.843989],
  [36.766733, -2.84602],
  [36.759575, -2.816347],
  [36.763277, -2.789132],
  [36.781227, -2.759208],
  [36.794845, -2.686534],
  [36.81228, -2.66198],
  [36.81136, -2.629471],
  [36.824354, -2.593015],
  [36.821018, -2.568744],
  [36.825512, -2.535981],
  [36.831345, -2.498437],
  [36.849419, -2.477843],
  [36.866251, -2.463689],
  [36.890193, -2.452631],
  [36.891433, -2.431937],
  [36.88448, -2.407747],
  [36.880743, -2.355814],
  [36.868592, -2.313992],
  [36.864088, -2.266684],
  [36.874036, -2.224686],
  [36.900826, -2.212924],
  [36.937088, -2.207195],
  [36.950271, -2.182167],
  [36.952925, -2.134007],
  [36.973171, -2.090948],
  [36.997339, -2.062447],
  [37.009651, -2.046609],
  [37.030696, -2.043961],
  [37.044831, -2.037806],
  [37.056455, -2.051018],
  [37.085651, -2.060352],
  [37.093807, -2.053003],
  [37.113187, -2.023418],
  [37.136229, -2.005034],
  [37.146906, -1.98609],
  [37.152741, -1.954562],
  [37.172406, -1.943631],
  [37.196427, -1.912127],
  [37.222217, -1.896207],
  [37.257156, -1.901469],
  [37.281277, -1.920513],
  [37.320679, -1.968425],
  [37.347983, -1.969804],
  [37.366596, -1.966454],
  [37.38772, -1.961146],
  [37.409325, -1.955733],
  [37.430857, -1.918753],
  [37.472091, -1.877577],
  [37.496016, -1.847629],
  [37.552616, -1.81875],
  [37.567519, -1.813133],
  [37.584312, -1.78737],
  [37.633558, -1.741781],
  [37.665125, -1.710721],
  [37.695999, -1.702703],
  [37.693408, -1.663648],
  [37.705796, -1.623542],
  [37.715591, -1.586238],
  [37.736098, -1.533989],
  [37.745183, -1.495839],
  [37.775875, -1.450078],
  [37.807006, -1.423505],
  [37.836323, -1.399373],
  [37.870383, -1.379747],
  [37.902177, -1.325974],
  [37.939554, -1.270739],
  [37.976104, -1.247363],
  [37.990595, -1.262435],
  [38.047047, -1.282635],
  [38.073123, -1.306783],
  [38.105324, -1.278771],
  [38.12979, -1.265102],
  [38.159857, -1.299231],
  [38.20824, -1.316097],
  [38.259765, -1.323157],
  [38.327361, -1.291151],
  [38.370344, -1.257467],
  [38.429193, -1.244149],
  [38.461852, -1.225768],
  [38.540753, -1.142604],
  [38.574101, -1.071827],
  [38.618446, -1.04133],
  [38.670052, -1.022356],
  [38.707093, -1.003046],
  [38.718148, -0.961645],
  [38.752438, -0.906688],
  [38.802023, -0.888049],
  [38.82909, -0.885488],
  [38.848342, -0.836965],
  [38.871506, -0.771947],
  [38.882058, -0.753925],
  [38.907564, -0.698616],
  [38.988438, -0.587374],
  [39.022346, -0.554029],
  [39.042903, -0.551387],
  [39.076762, -0.54193],
  [39.110485, -0.532114],
  [39.138276, -0.525075],
  [39.155429, -0.527322],
  [39.182988, -0.511578],
  [39.24968, -0.475685],
  [39.312181, -0.441428],
  [39.373283, -0.424091],
  [39.419307, -0.375677],
  [39.439216, -0.393151],
  [39.490476, -0.431984],
  [39.492091, -0.407841],
  [39.4962, -0.4021],
];

/* ---------- DEVICES ----------
   11 dispositivos (5 tomate + 3 pimiento + 3 pepino), todos del tipo IFCO BLL 6410.
   Todos están actualmente en el site del Palau de Congressos.
   Cada device tiene su origen (de donde salió) y por tanto su ruta asociada.
*/
const DEVICES = [
  // ---- TOMATE PERA (5) - desde El Ejido ----
  {
    id: 1,
    mac: "48:A3:BD:27:82:36",
    name: "Super Node M",
    type: "super_node",
    product: "tomate",
    origin: "site-elejido",
  },
  {
    id: 2,
    mac: "48:A3:BD:27:82:37",
    name: "Super Node M",
    type: "super_node",
    product: "tomate",
    origin: "site-elejido",
  },
  {
    id: 3,
    mac: "48:A3:BD:27:82:38",
    name: "Super Node M",
    type: "super_node",
    product: "tomate",
    origin: "site-elejido",
  },
  {
    id: 4,
    mac: "48:A3:BD:27:82:39",
    name: "Super Node M",
    type: "super_node",
    product: "tomate",
    origin: "site-elejido",
  },
  {
    id: 5,
    mac: "48:A3:BD:27:82:3A",
    name: "Super Node M",
    type: "super_node",
    product: "tomate",
    origin: "site-elejido",
  },
  // ---- PIMIENTO (3) - desde El Ejido ----
  {
    id: 6,
    mac: "48:A3:BD:27:82:3B",
    name: "Super Node M",
    type: "super_node",
    product: "pimiento",
    origin: "site-elejido",
  },
  {
    id: 7,
    mac: "48:A3:BD:27:82:3C",
    name: "Super Node M",
    type: "super_node",
    product: "pimiento",
    origin: "site-elejido",
  },
  {
    id: 8,
    mac: "48:A3:BD:27:82:3D",
    name: "Super Node M",
    type: "super_node",
    product: "pimiento",
    origin: "site-elejido",
  },
  // ---- PEPINO (3) - desde El Ejido ----
  {
    id: 9,
    mac: "48:A3:BD:27:82:3E",
    name: "Super Node M",
    type: "super_node",
    product: "pepino",
    origin: "site-elejido",
  },
  {
    id: 10,
    mac: "48:A3:BD:27:82:3F",
    name: "Super Node M",
    type: "super_node",
    product: "pepino",
    origin: "site-elejido",
  },
  {
    id: 11,
    mac: "48:A3:BD:27:82:40",
    name: "Super Node M",
    type: "super_node",
    product: "pepino",
    origin: "site-elejido",
  },
];

/* ---------- POSICIONES DENTRO DE LA GEOFENCE DEL PALAU ----------
   Los 11 devices se colocan agrupados en una zona concreta (como si fuera
   el palet/stand en una esquina del recinto), con ~5-8 metros entre ellos.
   A zoom bajo se mostrarán como un único cluster lila con el número.
*/
function _distributeDevicesInGeofence() {
  // Punto base: ligeramente desplazado del centro del Palau, en una "esquina"
  // del recinto, simulando la zona donde está el stand/palet.
  const base = [39.4964, -0.4018]; // ~25m al noreste del centro del site
  const positions = [];
  // Grid 4x3 muy compacta: ~6m de paso (0.00006° lat ≈ 6.7m, 0.00007° lon ≈ 6m en lat 39.5)
  const cols = 4,
    rows = 3;
  const stepLat = 0.00006;
  const stepLon = 0.00008;
  let i = 0;
  for (let r = 0; r < rows && i < DEVICES.length; r++) {
    for (let c = 0; c < cols && i < DEVICES.length; c++) {
      positions.push([
        base[0] + (r - (rows - 1) / 2) * stepLat,
        base[1] + (c - (cols - 1) / 2) * stepLon,
      ]);
      i++;
    }
  }
  return positions;
}
const _devicePositions = _distributeDevicesInGeofence();
DEVICES.forEach((d, i) => {
  d.position = _devicePositions[i];
});

/* ---------- SERIE DE TEMPERATURA ----------
   Generamos una serie de 7 días con variación 4-5 °C (todo perfecto).
   Cada device tiene su propia serie ligeramente distinta para variedad.
*/
function _generateTempSeries(seed) {
  // Random pseudo-determinista basado en el seed (id del device)
  let rng = seed * 9301 + 49297;
  const next = () => {
    rng = (rng * 9301 + 49297) % 233280;
    return rng / 233280;
  };
  // El dispositivo empieza a registrar al activarse en origen (27 May 07:45).
  // La "última vista" es siempre 12h antes del momento en que el usuario
  // abre la web — así la demo se siente "viva" en cualquier fecha.
  const activation = new Date("2026-05-27T07:45:00");
  const lastSeen = new Date(Date.now() - 12 * 3600 * 1000);
  const intervalMs = 4 * 3600 * 1000; // un punto cada 4h
  // Garantizamos al menos un par de puntos por si se testea muy cerca de la activación
  const end = Math.max(lastSeen.getTime(), activation.getTime() + 2 * intervalMs);
  const series = [];
  for (let ts = activation.getTime(); ts < end; ts += intervalMs) {
    const base = 4.0 + next() * 1.0; // 4.0 - 5.0
    const avg = parseFloat(base.toFixed(2));
    const min = parseFloat((base - 0.1 - next() * 0.2).toFixed(2));
    const max = parseFloat((base + 0.1 + next() * 0.2).toFixed(2));
    series.push({ ts: new Date(ts), avg, min, max });
  }
  // Punto final exactamente en "última vista" (real - 12h)
  const baseFinal = 4.0 + next() * 1.0;
  series.push({
    ts: new Date(end),
    avg: parseFloat(baseFinal.toFixed(2)),
    min: parseFloat((baseFinal - 0.1 - next() * 0.2).toFixed(2)),
    max: parseFloat((baseFinal + 0.1 + next() * 0.2).toFixed(2)),
  });
  return series;
}
DEVICES.forEach((d) => {
  d.tempSeries = _generateTempSeries(d.id);
});

/* ---------- JOURNEY DE CADA DEVICE ----------
   Cronología coherente con el "ahora" de la demo (30 May 2026, 11:18).
   Ordenado del más reciente al más antiguo.
*/
DEVICES.forEach((d) => {
  const originSite = SITES.find((s) => s.id === d.origin);

  // Calculamos stats de temperatura SOLO de los puntos durante el trayecto
  // (desde recogida el 27 May hasta primera vista en destino el 29 May).
  // Filtramos los puntos de la serie que caigan en esa ventana.
  const routeStart = new Date("2026-05-27T09:15:00");
  const routeEnd = new Date("2026-05-29T13:00:00");
  const routePoints = d.tempSeries.filter(
    (p) => p.ts >= routeStart && p.ts <= routeEnd,
  );
  // Si por alguna razón no hay puntos en la ventana, cogemos los últimos antes del fin de ruta
  const pointsForStats =
    routePoints.length > 0
      ? routePoints
      : d.tempSeries.filter((p) => p.ts <= routeEnd).slice(-4);

  const maxTemp = Math.max(...pointsForStats.map((p) => p.max));
  const minTemp = Math.min(...pointsForStats.map((p) => p.min));
  // Temperatura "final" (al llegar al destino): el último punto antes del cierre
  const finalTemp = pointsForStats[pointsForStats.length - 1].avg;
  const variation = maxTemp - minTemp;

  const product = PRODUCTS[d.product];

  d.journey = [
    {
      type: "info",
      title: "Lectura QR de visitante en stand AECOC",
      icon: "qr",
      timestamp: "30 May 2026, 11:18",
    },
    {
      type: "info",
      title: "Llegada al stand AECOC",
      icon: "check",
      timestamp: "30 May 2026, 08:30",
    },
    {
      type: "finished",
      title: "Ruta finalizada de",
      siteLabel: originSite.name,
      siteLabel2: "AECOC Valencia",
      siteType: "grower",
      siteType2: "hub",
      icon: "route",
      timestamp:
        "Última vista en origen: 27 May 2026, 18:42 — Primera vista en destino: 29 May 2026, 13:00",
      expandable: true,
      routeStats: {
        finalTemp: finalTemp.toFixed(2),
        maxTemp: maxTemp.toFixed(2),
        minTemp: minTemp.toFixed(2),
        variation: variation.toFixed(2),
        thresholdMin: product.targetTempMin,
        thresholdMax: product.targetTempMax,
      },
    },
    {
      type: "info",
      title: "Información del producto actualizada",
      icon: "info",
      timestamp: "27 May 2026, 08:00",
      expandable: true,
    },
    {
      type: "info",
      title: "Dispositivo activado en origen",
      icon: "check",
      timestamp: "27 May 2026, 07:45",
    },
  ];
});

/* ---------- HELPERS PÚBLICOS ---------- */
function getDeviceById(id) {
  return DEVICES.find((d) => d.id === id);
}
function getSiteById(id) {
  return SITES.find((s) => s.id === id);
}
function getProductOf(device) {
  return PRODUCTS[device.product];
}
function getRouteFor(device) {
  return device.origin === "site-nijar"
    ? ROUTE_NIJAR_TO_VALENCIA
    : ROUTE_ELEJIDO_TO_VALENCIA;
}
function getDevicesAtSite(siteId) {
  // Todos los dispositivos están en el site del Palau
  return siteId === "site-aecoc" ? DEVICES.slice() : [];
}
