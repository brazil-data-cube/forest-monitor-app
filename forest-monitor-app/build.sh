#!/bin/bash

echo ""
echo "---=== Building APP Image ===--- "
echo ""

VERSION=$(cat package.json | grep -oP '(?<="version": ")[^"]*')

# docker build -t forestmonitor/forest-monitor-frontend:v$VERSION .

# docker push forestmonitor/forest-monitor-frontend:v$VERSION

docker build -t ammaciel/forest-monitor-frontend:v$VERSION .

docker push ammaciel/forest-monitor-frontend:v$VERSION
