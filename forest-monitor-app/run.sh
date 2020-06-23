#!/bin/bash

echo ""
echo "---=== Starting APP Configuration ===--- "
echo ""

### Checking for variables

HAS_ERROR=0

if [ -z "$URL_GEOSERVER" ]; then
    HAS_ERROR=1

    echo "Missing environment variable: URL_GEOSERVER"
fi

if [ -z "$GEOSERVER_LAYERS" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: GEOSERVER_LAYERS"
fi

if [ -z "$URL_FOREST_API" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_FOREST_API"
fi

if [ -z "$URL_BDC_CACHE" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_BDC_CACHE"
fi

if [ -z "$URL_SLIDER_GROUP_DAYS" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_SLIDER_GROUP_DAYS"
fi

if [ -z "$APP_NAME" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: APP_NAME"
fi

if [ -z "$URL_LAMBDA_CBERS" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_LAMBDA_CBERS"
fi

if [ -z "$URL_LAMBDA_LANDSAT" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_LAMBDA_LANDSAT"
fi

if [ -z "$URL_LAMBDA_SENTINEL" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_LAMBDA_SENTINEL"
fi

if [ -z "$AWS_TOKEN" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: AWS_TOKEN"
fi

if [ -z "$URL_OAUTH" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_OAUTH"
fi

if [ -z "$URL_OAUTH_APP" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: URL_OAUTH_APP"
fi

if [ -z "$API_KEY" ]; then
    HAS_ERROR=1
    echo "Missing environment variable: API_KEY"
fi


if [ $HAS_ERROR = 1 ]; then
    echo ""
    echo "---=== Stoping due to missing variables ===--- "
    echo ""

    exit 1
fi

echo ""
echo "---=== Writing environment configuration ===--- "
echo ""

echo "" > src/assets/env.js
echo "(function (window) {" >> src/assets/env.js
echo "   window.__env = window.__env || {};" >> src/assets/env.js
echo "   window.__env.appName = '$APP_NAME';" >> src/assets/env.js
echo "   window.__env.urlGeoserver = '$URL_GEOSERVER';" >> src/assets/env.js
echo "   window.__env.workspaceGeoserver = '$WORKSPACE_GEOSERVER';" >> src/assets/env.js
echo "   window.__env.urlForestAPI = '$URL_FOREST_API';" >> src/assets/env.js
echo "   window.__env.urlLambdaCBERS = '$URL_LAMBDA_CBERS';" >> src/assets/env.js
echo "   window.__env.urlLambdaLANDSAT = '$URL_LAMBDA_LANDSAT';" >> src/assets/env.js
echo "   window.__env.urlLambdaSentinel = '$URL_LAMBDA_SENTINEL';" >> src/assets/env.js
echo "   window.__env.lambdaToken = '$AWS_TOKEN';" >> src/assets/env.js
echo "   window.__env.urlOauth = '$URL_OAUTH';" >> src/assets/env.js
echo "   window.__env.sliderGroupDays = '$URL_SLIDER_GROUP_DAYS';" >> src/assets/env.js
echo "   window.__env.urlOauthApp = '$URL_OAUTH_APP';" >> src/assets/env.js
echo "   window.__env.planetAPIKey = '$API_KEY';" >> src/assets/env.js
echo "   window.__env.geoserverLayers = $GEOSERVER_LAYERS;" >> src/assets/env.js

echo "}(this));" >> src/assets/env.js
echo "" >> src/assets/env.js

echo ""
echo "---=== Current APP Configuration ===--- "
echo ""

echo "URL_GEOSERVER: $URL_GEOSERVER"
echo "URL_FOREST_API: $URL_FOREST_API"
echo "URL_BDC_CACHE: $URL_BDC_CACHE"
echo "URL_SLIDER_GROUP_DAYS: $URL_SLIDER_GROUP_DAYS"
echo "APP_NAME: $APP_NAME"
echo "URL_LAMBDA_CBERS: $URL_LAMBDA_CBERS"
echo "URL_LAMBDA_LANDSAT: $URL_LAMBDA_LANDSAT"
echo "URL_LAMBDA_SENTINEL: $URL_LAMBDA_SENTINEL"
echo "AWS_TOKEN: $AWS_TOKEN"
echo "URL_OAUTH: $URL_OAUTH"
echo "URL_OAUTH_APP: $URL_OAUTH_APP"
echo "API_KEY: $API_KEY"
echo "GEOSERVER_LAYERS: $GEOSERVER_LAYERS"

echo ""
echo "---=== Runing APP ===--- "
echo ""

#npm start 

ng serve --base-href /forest-monitor-ibama/ --prod --host 0.0.0.0 --disableHostCheck
