
FROM node:12-alpine as builder
RUN apk update && apk add --no-cache make git

WORKDIR /app
ARG Authority=http://192.168.0.5:5000
ARG UseAuthority=true
ARG RequireHttpsMetadata=false
ARG ApiName=api1
ARG ImgFolder=~/images
ARG HostServer=http://192.168.0.5
ARG HostPort=4500
ARG ApiUrl=http://192.168.0.5:52050/api/
ARG ClientId="tgappmodel"
ARG MapKey

ENV AppModelConfiguration:Authority=${Authority}
ENV AppModelConfiguration:UseAuthority=${UseAuthority}
ENV AppModelConfiguration:RequireHttpsMetadata=${RequireHttpsMetadata}
ENV AppModelConfiguration:ApiName=${ApiName}
ENV AppModelConfiguration:ImgFolder=${ImgFolder}
ENV AppModelConfiguration:HostServer=${HostServer}
ENV AppModelConfiguration:HostPort=${HostPort}
ENV AppModelConfiguration:ApiUrl=${ApiUrl}
ENV AppModelConfiguration:ClientId=${ClientId}
ENV AppModelConfiguration:MapKey=${MapKey}

COPY package.json package-lock.json  /app/
RUN cd /app && npm set progress=false && npm install

COPY .  /app
RUN cd /app && npm run build-prod


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/wwwroot /usr/share/nginx/html
COPY --from=builder /app/wwwroot/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
