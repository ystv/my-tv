# build environment
FROM node:alpine as build
ARG BUILD_ID_ARG
ENV BUILD_ID=$BUILD_ID_ARG
LABEL site="my-tv"
LABEL stage="builder"
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
LABEL site="my-tv"
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
RUN apk add curl
HEALTHCHECK CMD curl --fail http://localhost:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]