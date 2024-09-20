FROM alpine:3.13

WORKDIR /var/www/

RUN apk update && apk upgrade && apk add --update --no-cache nodejs npm && rm -f /var/cache/apk/*

RUN npm install -g http-server

COPY conf/ ./
RUN chmod 664 *

CMD ["http-server", "-p", "8080", "-d", "/var/www/"]