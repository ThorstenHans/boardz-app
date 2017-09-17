FROM node AS build-env
LABEL maintainer="Thorsten Hans <thorsten.hans@thinktecture.com>"
WORKDIR /app
RUN mkdir /dist
COPY ./code/package.json ./code/package-lock.json ./
RUN npm i
COPY ./code/*.* ./ 
ADD code/src /app/src
RUN npm run build

FROM nginx:1.13.3-alpine
COPY ./code/nginx.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-env /dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
#CMD ["ls", "/dist"]
