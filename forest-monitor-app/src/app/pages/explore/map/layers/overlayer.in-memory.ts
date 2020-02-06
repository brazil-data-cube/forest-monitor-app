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
        name: 'Mascara',
        layer: null,
        filter: false,
        style: 'mascara_desmatamento'
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
