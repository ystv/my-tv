# build environment
FROM node:alpine as build
LABEL site="my-tv"
LABEL stage="builder"
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
ARG REACT_APP_BUILD_ID_ARG
ENV REACT_APP_BUILD_ID=$REACT_APP_BUILD_ID_ARG
LABEL build=$REACT_APP_BUILD_ID_ARG
ARG REACT_APP_API_BASEURL_ARG
ARG REACT_APP_SECURITY_ENDPOINT_ARG
ENV REACT_APP_SECURITY_ENDPOINT=$REACT_APP_SECURITY_ENDPOINT_ARG
ENV REACT_APP_API_BASEURL=$REACT_APP_API_BASEURL_ARG
RUN yarn build

# production environment
FROM nginx:stable-alpine
LABEL site="my-tv"
LABEL stage="final"
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
RUN apk add curl
HEALTHCHECK CMD curl --fail http://localhost:80/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]