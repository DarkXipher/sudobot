FROM php:7.3.1-fpm-alpine3.8
RUN apk update; \
    apk upgrade;
RUN docker-php-ext-install pdo pdo_mysql

#RUN docker-php-ext-install mysqli