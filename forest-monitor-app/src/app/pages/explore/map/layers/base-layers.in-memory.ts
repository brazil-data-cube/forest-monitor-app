import {tileLayer} from 'leaflet';

/**
 * return a list of external base layers/maps
 * static WMS list, and the dates are of layer Planet
 */

export class BaseLayers  {
   public  BdcLayer  = [];
   public static getBdcLayer(BdcLayer) {
      let data = new Date();
      let month = data.getMonth() +1 ;
      let year = data.getFullYear();

      let strMonth;
      let strmonthOld;
      let strData;
      let strDataOld;

      if (month > 1 && month != 2){
         strMonth = month - 1 ;
         strmonthOld = month - 2;
         if (strMonth < 10 || strmonthOld < 10) {
            strMonth = '0' + strMonth;
            strmonthOld = '0' + strmonthOld;
         } else {
            strMonth = strMonth.toString();
            strmonthOld = strmonthOld.toSttring();
         }
         strData = year + '-' +  strMonth;
         strDataOld = year + '-' + strmonthOld;

      }
      else if (month == 1) {
         strData = (year -1) + '-' + 12 ;
         strDataOld = (year -1) + '-' + 11 ;
         }
      else if (month == 2) {
         strMonth = month - 1 ;
         strData = year + '-' +   '0' + strMonth;
         strDataOld = (year -1) + '-' + 12 ;
      }

      return  BdcLayer  = [
         {
            id: 'google_sattelite',
            enabled: false,
            name: 'Google Satellite',
            layer: tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
               subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }),
         },
         {
            id: 'google_hybrid',
            enabled: true,
            name: 'Google Hybrid',
            layer: tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
               subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }),
         },
         {
            id: 'google_streets',
            enabled: false,
            name: 'Google Streets',
            layer: tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
               subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }),
         },
         {
            id: 'google_terrain',
            enabled: false,
            name: 'Google Terrain',
            layer: tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
               subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
            }),
         },
         {
            id: 'osm',
            enabled: false,
            name: 'OSM',
            layer: tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
               ///subdomains: ['a','b','c']
            }),
         },
         {
            id: 'osm_topo',
            enabled: false,
            name: 'OSM TOPO',
            layer: tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }),
         },

         {
            id: 'mosaico7',
            enabled: false,
            name: 'MOSAICO 2017',
            layer: tileLayer.wms(`http://terrabrasilis.dpi.inpe.br/geoserver/wms`, {
               layers: `prodes-legal-amz:temporal_mosaic_legal_amazon_principal`,
               format: 'image/png',
               transparent: true,
               className: `MOSAICO_landsat`,
               time:'2017-01-01T00:00:00.000Z'
           } as any)
         },
         {
            id: 'mosaico8',
            enabled: false,
            name: 'MOSAICO 2018',
            layer: tileLayer.wms(`http://terrabrasilis.dpi.inpe.br/geoserver/wms`, {
               layers: `prodes-legal-amz:temporal_mosaic_legal_amazon_principal`,
               format: 'image/png',
               transparent: true,
               className: `MOSAICO_landsat`,
               time:'2018-01-01T00:00:00.000Z'
           } as any)
         },
         {
            id: 'mosaico9',
            enabled: false,
            name: 'MOSAICO 2019',
            layer: tileLayer.wms(`http://terrabrasilis.dpi.inpe.br/geoserver/wms`, {
               layers: `prodes-legal-amz:temporal_mosaic_legal_amazon_principal`,
               format: 'image/png',
               transparent: true,
               className: `MOSAICO_landsat`,
               time:'2019-01-01T00:00:00.000Z'
           } as any)
         },
         {
            id: 'mosaico0',
            enabled: false,
            name: 'MOSAICO 2020',
            layer: tileLayer.wms(`http://terrabrasilis.dpi.inpe.br/geoserver/wms`, {
               layers: `prodes-legal-amz:temporal_mosaic_legal_amazon_principal`,
               format: 'image/png',
               transparent: true,
               className: `MOSAICO_landsat`,
               time:'2020-01-01T00:00:00.000Z'
           } as any)
         },
         {
            id: 'planet',
            enabled: false,
            name: `PLANET ${strDataOld} até ${strData}`,
            layer: tileLayer(`https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_${strDataOld}_mosaic/gmap/{z}/{x}/{y}.png?api_key=12b17c3548c047218485084e2f8c8048`)
         }

      ];


   }



}
