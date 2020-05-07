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
        id: 'mascara_deter',
        enabled: true,
        name: 'MASCARA_DETER - 2020',
        layer: null,
        filter: false,
        style: 'class_deter'
    },

    {
      id: 'deter',
      enabled: true,
      name: 'DETER - 2020',
      layer: null,
      filter: false,
      style: 'class_deter'
    }
];
