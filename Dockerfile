# build environment
# Webpack is not fully compatible with the latest version of Node
# Feel free to change back to `alpine` when the issue is resolved
FROM node:16 as build
LABEL site="my-tv"
LABEL stage="builder"
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . ./
ARG PUBLIC_BUILD_ID_ARG
ENV PUBLIC_BUILD_ID=$PUBLIC_BUILD_ID_ARG
LABEL build=$PUBLIC_BUILD_ID_ARG
ARG PUBLIC_API_BASEURL_ARG
ARG PUBLIC_SECURITY_BASEURL_ARG
ARG PUBLIC_BASEURL_ARG
ARG PUBLIC_CREATOR_BASEURL_ARG
ENV PUBLIC_SECURITY_BASEURL=$PUBLIC_SECURITY_BASEURL_ARG
ENV PUBLIC_API_BASEURL=$PUBLIC_API_BASEURL_ARG
ENV PUBLIC_BASEURL=$PUBLIC_BASEURL_ARG
ENV PUBLIC_CREATOR_BASEURL=$PUBLIC_CREATOR_BASEURL_ARG
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