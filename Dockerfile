# Run to test image
# docker run -d --rm --name forest-monitor forest-monitor/forest-monitor:v1.1.0
FROM node:12.8.1 as node

WORKDIR /app/

RUN mkdir -p /app/forest-monitor-app

COPY /forest-monitor-app/package.json /app/forest-monitor-app
COPY /forest-monitor-app/src /app/forest-monitor-app/src
COPY run.sh /app/
RUN chmod +x /app/run.sh

WORKDIR /app/forest-monitor-app

RUN npm install

ENTRYPOINT "/app/run.sh"

#RUN /app/run.sh
