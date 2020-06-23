# Run to test image
# docker run -d --rm --name forest-monitor forestmonitor/forest-monitor-frontend:v1.1.0
FROM node:12.8.1 as node

WORKDIR /app/

COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY ./angular.json /app/
COPY ./browserslist /app/
COPY ./ts*.json /app/
COPY src /app/src
COPY run.sh /app/
RUN chmod +x /app/run.sh

RUN npm install

ENTRYPOINT "/app/run.sh"

#RUN /app/run.sh
