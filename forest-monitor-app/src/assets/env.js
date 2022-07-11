
(function (window) {
   window.__env = window.__env || {};
   window.__env.appName = 'forest-monitor-local';
   window.__env.basePath = 'forest-monitor';
   window.__env.urlGeoserver = 'http://terrabrasilis.dpi.inpe.br/geoserver';
   window.__env.workspaceGeoserver = 'forest-monitor-homologation';
   window.__env.urlForestAPI = 'http://0.0.0.0:5000/api';
   window.__env.urlLambdaCBERS = 'https://1yw3f4nr05.execute-api.us-east-1.amazonaws.com/production/tiles';
   window.__env.urlLambdaLANDSAT = 'https://f52naija7b.execute-api.us-west-2.amazonaws.com/production/tiles';
   window.__env.urlLambdaSentinel = 'https://g3fesq0i2k.execute-api.eu-central-1.amazonaws.com/production/s2/tiles';
   window.__env.lambdaToken = 'lkFM2938e2adki2';
   window.__env.urlOauth = 'http://oauth.dpi.inpe.br/api/oauth';
   window.__env.sliderGroupDays = '1';
   window.__env.urlOauthApp = 'http://oauth.dpi.inpe.br';
   window.__env.planetAPIKey = 'PLAKa13aa9ce478245fe8478335f8b1fdc52';
   window.__env.geoserverLayers = 
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

;
   window.__env.geoserverClass = [
     {

       enabled: true,
       name: 'CICATRIZ_DE_QUEIMADA',
       filter: true,
       layer: 'deter',
       style: 'class_deter'
      },{

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
        layer:'deter',
        style: 'class_deter'}];
}(this));

