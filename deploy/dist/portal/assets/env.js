(function (window) {
    window.__env = window.__env || {};
    // environment type
    window.__env.appName = 'forest-monitor-local';

    // workspace name - geoserver
    window.__env.workspaceGeoserver = 'forest-monitor';

    //Layers
    //window.__env.jsonGeoserverLayers = '../app/pages/explore/map/layers/overlayer.json';
    
    // API url Geoserver
    window.__env.urlGeoserver = 'http://localhost:8001/geoserver';
    // API url FOREST API
    //window.__env.urlForestAPI = 'http://brazildatacube.dpi.inpe.br/forest-monitor/api';
    window.__env.urlForestAPI = 'http://0.0.0.0:5001/api'

    window.__env.urlLambdaCBERS = 'https://dektfzn49e.execute-api.us-east-1.amazonaws.com/production/tiles';
    // Lambda LANDSAT
    window.__env.urlLambdaLANDSAT = 'https://jnj5vx5tvi.execute-api.us-west-2.amazonaws.com/production/tiles';
    // Lambda Sentinel
    window.__env.urlLambdaSentinel = 'https://n79mab8azi.execute-api.eu-central-1.amazonaws.com/production/s2/tiles';
    //Lambda token
    window.__env.lambdaToken = 'lkFM2938e2adki2';
    // API url Oauth
    window.__env.urlOauth = 'http://oauth.dpi.inpe.br/api/oauth';
    
    // API url STAC
    window.__env.sliderGroupDays = '1';
    // API url Oauth APP
    window.__env.urlOauthApp = 'http://oauth.dpi.inpe.br';
    window.__env.planetAPIKey = '08c4d049131640b4bd35ee793e226322';
}(this));