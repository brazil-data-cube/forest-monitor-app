
import { tileLayer } from 'leaflet';
import { BdcLayer } from './layer.interface';

/**
 * return a list of external base layers/maps
 * static WMS list, and the dates are of layer Planet
 */

export class BaseLayers  { 
   public  BdcLayer  = []; 
   public static getBdcLayer(BdcLayer) { 
      let data = new Date();
      let month = data.getMonth() +1 ;
      let str_Month;
      if (month < 10) {
         str_Month = '0' + month;
      } else {
         str_Month = month.toString();
         }
      let year = data.getFullYear(); 
      let str_data;
      let str_data_old;
      if (str_Month > 1 && str_Month != 2){
         str_data = year + '-' + (str_Month-1) ;   
         str_data_old = year + '-' + (str_Month-2)
      }
      else if (str_Month == 1) {
         str_data = (year -1) + '-' + 12 ;
         str_data_old = (year -1) + '-' + 11 ;
         }
      else if (str_Month == 2) {
         str_data = year + '-' + (str_Month-1) ;
         str_data_old = (year -1) + '-' + 12 ;
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
            id: 'mosaico',
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
            id: 'mosaico',
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
            id: 'mosaico',
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
            id: 'planet',
            enabled: false,
            name: `PLANET ${str_data_old}`,
            layer: tileLayer(`https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_${str_data_old}_mosaic/gmap/{z}/{x}/{y}.png?api_key=12b17c3548c047218485084e2f8c8048`)
         },
         {
            
            id: 'planet',
            enabled: false,
            name: `PLANET ${str_data}`,
            layer: tileLayer(`https://tiles.planet.com/basemaps/v1/planet-tiles/planet_medres_normalized_analytic_${str_data}_mosaic/gmap/{z}/{x}/{y}.png?api_key=12b17c3548c047218485084e2f8c8048`)
         }
            
      ];
     
      
   }


   
}
