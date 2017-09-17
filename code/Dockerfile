FROM node AS build-env
WORKDIR /app
RUN mkdir /dist
COPY ./package.json ./package-lock.json ./
RUN npm i
COPY ./*.* ./ 
ADD src /app/src
RUN npm run build

FROM nginx:1.13.3-alpine
COPY nginx.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-env /dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
#CMD ["ls", "/dist"]
