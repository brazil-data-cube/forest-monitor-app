# Run to test image
# docker run -d --rm --name forest-monitor forestmonitor/forest-monitor-frontend:v1.1.0
FROM node:12.8.1 as node

# to monitor the health of the running service based on this container
RUN apt-get update \
  && apt-get install -y curl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app/

COPY ./package.json /app/
RUN npm install --silent
COPY ./angular.json /app/
COPY ./browserslist /app/
COPY ./ts*.json /app/
COPY src /app/src
COPY run.sh /app/
RUN chmod +x /app/run.sh

RUN npm run build

ENTRYPOINT "/app/run.sh"

#RUN /app/run.sh
