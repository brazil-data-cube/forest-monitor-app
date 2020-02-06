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
   {
      id: '',
      enabled: false,
      name: 'Blank',
      layer: tileLayer('', {})
   }
];
