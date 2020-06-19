#!/bin/bash

echo ""
echo "---=== Building APP Image ===--- "
echo ""

VERSION=$(cat forest-monitor-app/package.json | grep -oP '(?<="version": ")[^"]*')

docker build -t forestmonitor/forest-monitor-frontend:v$VERSION .

docker push forestmonitor/forest-monitor-frontend:v$VERSION
