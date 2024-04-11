# Use the official PHP base image with Apache
FROM php:8.2-apache

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the Laravel project files to the container
COPY . /var/www/html

# Install PHP extensions and dependencies
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        libzip-dev \
        unzip \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
    && docker-php-ext-install \
        pdo_mysql \
        zip \
        gd \
        mbstring \
        exif \
        pcntl \
        bcmath \
        opcache \
        soap

# Enable Apache rewrite module
RUN a2enmod rewrite

# Set the Apache document root
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf

# Enable Apache .htaccess overrides
RUN sed -ri -e 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Install Composer globally
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php');"

# Install Laravel dependencies
RUN composer install --no-dev --no-interaction --no-progress --optimize-autoloader

# Set the Apache port to 80
EXPOSE 80

# Run the Apache server
CMD ["apache2-foreground"]