#!/bin/bash

URL_GEOSERVER="http://localhost:8001/geoserver" \
BASE_PATH="forest-monitor" \
WORKSPACE_GEOSERVER="forest-monitor" \
URL_FOREST_API="http://0.0.0.0:5001/api" \
URL_BDC_CACHE="http://brazildatacube.dpi.inpe.br/forest-monitor/bdc-cache/tms" \
URL_SLIDER_GROUP_DAYS="1" \
APP_NAME="forest-monitor-local" \
URL_LAMBDA_CBERS="https://1yw3f4nr05.execute-api.us-east-1.amazonaws.com/production/tiles" \
URL_LAMBDA_LANDSAT="https://f52naija7b.execute-api.us-west-2.amazonaws.com/production/tiles" \
URL_LAMBDA_SENTINEL="https://g3fesq0i2k.execute-api.eu-central-1.amazonaws.com/production/s2/tiles" \
AWS_TOKEN="lkFM2938e2adki2" \
URL_OAUTH="http://oauth.dpi.inpe.br/api/oauth" \
URL_OAUTH_APP="http://oauth.dpi.inpe.br" \
API_KEY="08c4d049131640b4bd35ee793e226322" \
GEOSERVER_LAYERS="
[ {
id: 'areas_interesse',
enabled: true,
name: 'Area Teste',
layer: null,
filter: false,
style: 'area_test',
destinationLayer: false
},
{
id: 'mascara_prodes',
enabled: true,
name: 'Mascara_Prodes',
layer: null,
filter: false,
style: 'mascara_desmatamento',
destinationLayer: false
},
{
id: 'areas_ibama_cell25km',
enabled: true,
name: 'Celulas',
layer: null,
filter: false,
style: 'area_test',
destinationLayer: false
},

{
id: 'mascara_deter',
enabled: true,
name: 'MASCARA_DETER - 2020',
layer: null,
filter: false,
style: 'class_deter',
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
./run.sh
