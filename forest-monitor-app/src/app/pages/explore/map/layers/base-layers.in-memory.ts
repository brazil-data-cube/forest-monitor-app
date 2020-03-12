import { tileLayer } from 'leaflet';
import { BdcLayer } from './layer.interface';


/**
 * return a list of external base layers/maps
 * static WMS list
 */
export const BaseLayers: BdcLayer[] = [
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
         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
   /*{
      id: 'mosaico',
      enabled: false,
      name: 'MOSAICO 2018',
      layer: tileLayer('http://terrabrasilis.dpi.inpe.br/geoserver/ows?service=WMS&
      request=GetMap&layers=prodes-legal-amz%3Atemporal_mosaic_legal_amazon_2000_2018&
      styles=&format=image%2Fpng&transparent=true&version=1.1.1&tiled=true&_name=temporal_mosaic_legal_amazon_2000_2018&_baselayer=false&
      time=2019-01-01T00%3A00%3A00.000Z&width=256&height=256&srs=EPSG%3A3857&bbox=-6261721.357121639,-1252344.2714243263,-5009377.085697311,0',{
         attribution: "Weather data © 2012 IEM Nexrad"
     
       }),
      
   },*/
   {
      id: 'mosaico',
      enabled: false,
      name: 'MOSAICO 2017',
      layer: tileLayer.wms(`http://terrabrasilis.dpi.inpe.br/geoserver/wms`, {
         layers: `prodes-legal-amz:temporal_mosaic_legal_amazon_2000_2018`,
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
         layers: `prodes-legal-amz:temporal_mosaic_legal_amazon_2000_2018`,
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
         layers: `prodes-legal-amz:temporal_mosaic_legal_amazon_2000_2018`,
         format: 'image/png',
         transparent: true,
         className: `MOSAICO_landsat`,
         time:'2019-01-01T00:00:00.000Z'       
     } as any)
   },
   {
      id: '',
      enabled: false,
      name: 'Blank',
      layer: tileLayer('', {})
   }
];
function newFunction(): any {
   return 'image/png';
}
