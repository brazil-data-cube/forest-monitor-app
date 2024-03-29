#!/bin/bash

URL_GEOSERVER="http://localhost:8001/geoserver" \
BASE_PATH="forest-monitor" \
WORKSPACE_GEOSERVER="forest-monitor" \
URL_FOREST_API="http://0.0.0.0:5001/api" \
URL_BDC_CACHE="http://terrabrasilis.dpi.inpe.br/forest-monitor/bdc-cache/tms" \
URL_SLIDER_GROUP_DAYS="1" \
APP_NAME="forest-monitor-local" \
URL_LAMBDA_CBERS="https://1yw3f4nr05.execute-api.us-east-1.amazonaws.com/production/tiles" \
URL_LAMBDA_LANDSAT="https://f52naija7b.execute-api.us-west-2.amazonaws.com/production/tiles" \
URL_LAMBDA_SENTINEL="https://g3fesq0i2k.execute-api.eu-central-1.amazonaws.com/production/s2/tiles" \
AWS_TOKEN="" \
URL_OAUTH="http://oauth.dpi.inpe.br/api/oauth" \
URL_OAUTH_APP="http://oauth.dpi.inpe.br" \
API_KEY="" \
GEOSERVER_LAYERS="[
  {
    id: 'areas_interesse',
    enabled: true,
    name: 'ÁREA TESTE',
    layer: null,
    filter: false,
    style: 'area_test',
    destinationLayer: false
  },
  {
    id: 'mascara_prodes',
    enabled: true,
    name: 'MASCARA PRODES',
    layer: null,
    filter: false,
    style: 'mascara_desmatamento',
    destinationLayer: false
  },
  {
    id: 'mascara_deter',
    enabled: true,
    name: 'MASCARA DETER - 2020',
    layer: null,
    filter: false,
    style: 'class_deter',
    destinationLayer: false
  },
  {
    id: 'limite_municipal_amz_2007_2500',
    enabled: true,
    name: 'LIMITE MUNICIPAL',
    layer: null,
    filter: false,
    style: 'limite',
    destinationLayer: false
  },
  {
    id: 'deter',
    enabled: true,
    name: 'DETER - 2020',
    layer: null,
    filter: false,
    style: 'class_deter',
    destinationLayer: true
  }
]
" \
GEOSERVER_CLASS="[
  {
    enabled: true,
    name: 'CICATRIZ_DE_QUEIMADA',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  },
  {
    enabled: true,
    name: 'CORTE_SELETIVO',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  },
  {
    enabled: true,
    name: 'CS_DESORDENADO',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  },
  {
    enabled: true,
    name: 'CS_GEOMETRICO',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  },
  {
    enabled: true,
    name: 'DEGRADACAO',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  },
  {
    enabled: true,
    name: 'DESMATAMENTO_CR',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  },
  {
    enabled: true,
    name: 'DESMATAMENTO_VEG',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  },
  {
    enabled: true,
    name: 'MINERACAO',
    filter: true,
    layer: 'deter',
    style: 'class_deter'
  }
]" \
./run.sh development
