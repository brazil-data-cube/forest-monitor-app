import { BdcOverlayer } from './layer.interface';

/**
 * return mask and polygons base
 */
export const Overlayers: BdcOverlayer[] = [
    {
        id: 'areas_interesse',
        enabled: true,
        name: 'Area Teste',
        layer: null,
        filter: false,
        style: 'area_test'
    },
    {
      id: 'mascara_prodes',
      enabled: true,
      name: 'Mascara_Prodes',
      layer: null,
      filter: false,
      style: 'mascara_desmatamento'
    },
    {
        id: 'areas_ibama_cell25km',
        enabled: true,
        name: 'Celulas',
        layer: null,
        filter: false,
        style: 'area_test'
    },

    {
        id: 'deter_d',
        enabled: true,
        name: 'DETER_D - 2020',
        layer: null,
        filter: false,
        style: 'class_deter'
    },

    {
      id: 'deter_m',
      enabled: true,
      name: 'DETER_M - 2020',
      layer: null,
      filter: false,
      style: 'class_deter'
    }
];
