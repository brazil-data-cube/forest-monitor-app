/**
 * return sattelite/sensor
 */
export const satsens = ['CBERS-4:WFI', 'CBERS-4:MUX', 'SENTINEL-2:MSI', 'LANDSAT-8:OLI'];

/**
 * return collection key by collection
 */
export const collectionKeyByCollection = {
  'landsat': 'landsat-8-l1',
  'sentinel': 'sentinel-2-l1c',
  'cbers': ['CBERS4-MUX', 'CBERS4-AWFI'],
  'planet': 'global_monthly'
};

/**
 * return classes of DETER
 */
export const DETERclasses = [
  'CICATRIZ_DE_QUEIMADA', 'DESMATAMENTO_VEG', 'CS_DESORDENADO', 'DESMATAMENTO_CR',
  'CS_GEOMETRICO', 'DEGRADACAO', 'MINERACAO', 'CORTE_SELETIVO'
];

export const DETERclassesSPLIT = [
  'CICATRIZ_DE_QUEIMADA', 'CS_DESORDENADO',
  'CS_GEOMETRICO', 'DEGRADACAO'
];

/**
 * return UF available
 */
export const UFList = ['AM', 'PA'];

/**
 * GET PATHROW
 */
export function getPathRow(f) {
  if (f['properties']['collection'] === 'sentinel-2-l1c') {
    return f['id'].split('_')[1];
  } else if (f['properties']['collection'] === 'landsat-8-l1') {
    const prop = f['properties'];
    return `${prop['eo:column']}${prop['eo:row']}`;
  } else if (f['collection'] && f['collection'].indexOf('CBERS') >= 0) {
    const prop = f['properties'];
    return `${prop['cbers:path']}${prop['cbers:row']}`;
  }
}

/**
 * GET SENSOR
 */
export function getSensor(f) {
  let eoInstrument = f['properties']['eo:instrument'];

  if (!eoInstrument)
  {
    eoInstrument = f['properties']['instruments'];
  }

  if (!eoInstrument)
  {
    return '';
  }

  return eoInstrument.toString().substring(0, 4).replace('AWFI', 'WFI').substring(0,3);
}

/**
 * GET SATELLITE
 */
export function getSatellite(f) {
  const collection = f.collection ? f.collection : f.properties.collection || null;
  if (collection) {
    if (collection.indexOf('sentinel') >= 0) return 'Sentinel-2';
    else if (collection.indexOf('landsat') >= 0) return 'Landsat-8';
    else if (collection.toLowerCase().indexOf('cbers') >= 0) return 'Cbers-4';
    else if (collection.toLowerCase().indexOf('global_monthly') >= 0) return 'Planet';
  } else {
    return 'PlanetDaily';
  }
}

export const defaultRGBBands = {
  'sentinel-2-l1c': {
    red: '11',
    green: '8A',
    blue: '04'
  },
  'landsat-8-l1': {
    red: '6',
    green: '5',
    blue: '4'
  },
  'CBERS4-MUX': {
    red: '6',
    green: '8',
    blue: '7'
  },
  'CBERS4-AWFI': {
    red: '14',
    green: '16',
    blue: '15'
  }
}

export const bandsBySensor = {
  'sentinel-2-l1c': ['01', '02', '03', '04', '05', '06', '07', '08', '8A', '09', '10', '11', '12'],
  'landsat-8-l1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', 'QA'],
  'CBERS4-MUX': ['5', '6', '7', '8'],
  'CBERS4-AWFI': ['13', '14', '15', '16']
}
export const destinationLayerIdField = 'id';

export function getLocalStorageAuthKey()
{
  const applicationName = window['__env'].appName;
  return `user-${applicationName}`;
}
