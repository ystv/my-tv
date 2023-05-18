# build environment
# Webpack is not fully compatible with the latest version of Node
# Feel free to change back to `alpine` when the issue is resolved
FROM node:16 as build
#FROM node:20.2-alpine3.17 as build
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
ARG REACT_APP_SECURITY_BASEURL_ARG
ARG REACT_APP_PUBLIC_BASEURL_ARG
ARG REACT_APP_CREATOR_BASEURL_ARG
ENV REACT_APP_SECURITY_BASEURL=$REACT_APP_SECURITY_BASEURL_ARG
ENV REACT_APP_API_BASEURL=$REACT_APP_API_BASEURL_ARG
ENV REACT_APP_PUBLIC_BASEURL=$REACT_APP_PUBLIC_BASEURL_ARG
ENV REACT_APP_CREATOR_BASEURL=$REACT_APP_CREATOR_BASEURL_ARG
RUN yarn build

# production environment
FROM nginx:stable-alpine
LABEL site="my-tv"
LABEL stage="final"
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
RUN apk add curl
HEALTHCHECK --interval=12s CMD curl --fail http://localhost/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]