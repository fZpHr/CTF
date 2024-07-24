FROM alpine:3.13

RUN apk update && apk add --no-cache nginx

# Créer le répertoire /run/nginx
RUN mkdir -p /run/nginx

COPY conf/nginx.conf /etc/nginx/nginx.conf
COPY conf/proxy_params /etc/nginx/proxy_params

CMD ["nginx", "-g", "daemon off;"]