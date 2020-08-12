# FOREST MONITOR - FRONT END - WEB APP

## Installation
### Requirements

Make sure you have the following libraries installed:

- [`Node.js >= 8.x`](https://nodejs.org/en/)
- [`Angular CLI >= 7`](https://angular.io/)

```
cd forest-monitor-app
npm install
```

## Running 

This software needs some environment variables set to run correctly.

### Application Startup variables

```
URL_GEOSERVER - URL to geoserver
BASE_PATH - Web path inside the container server
WORKSPACE_GEOSERVER - Geoserver Workspace to get layer and styles
URL_FOREST_API - URL to forest-monitor-app backend forest api 
URL_BDC_CACHE - URL to forest-monitor-app backend bdc cache
URL_SLIDER_GROUP_DAYS  - Number of days to group on slider
APP_NAME - App name to be used on oauth application 
URL_LAMBDA_CBERS - URL to AWS CBERS provider
URL_LAMBDA_LANDSAT - URL to AWS LANDSAT provider
URL_LAMBDA_SENTINEL - URL to AWS SENTINEL provider
AWS_TOKEN - AWS authentication token
URL_OAUTH - URL to oauth api
URL_OAUTH_APP - URL to oauth APP
API_KEY - Planet API Key
GEOSERVER_LAYERS - GeoServer Layers on JSON Format.
```

### GeoServer Layer JSON Format
```
[ {
        id: 'layer1',
        enabled: true,
        name: 'Layer 1',
        layer: null,
        filter: false,
        style: 'layer1_style'
    },
    {
        id: 'layer2',
        enabled: true,
        name: 'Layer 2',
        layer: null,
        filter: false,
        style: 'layer2_style'
    }
]
```

### Startup Script

To start the application you may use the start script run-default.sh or copy to your own script changing the variables inside,
this script call run.sh after setting the needed environment variables.

This application needs to be started using the run.sh script because it creates the env.js file that is the initial configuration of the application.

## Building and Pushing a Docker Image

Use build.sh script to create the docker image and push it to Docker Hub.
Don't forget to increase the application version on packages.json.
