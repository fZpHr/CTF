FROM alpine:3.13

WORKDIR /var/www/

RUN apk update && apk upgrade && apk add --update --no-cache nodejs npm && rm -f /var/cache/apk/*

RUN npm install -g http-server

COPY conf/login.html conf/intern.html conf/build.html conf/dev.html conf/contact.html conf/services.html conf/about.html conf/index.html conf/static.html conf/doigdrip.jpg conf/wallpaper.png ./
RUN chmod 664 *

CMD ["http-server", "-p", "8080", "-d", "/var/www/"]