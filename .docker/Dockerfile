FROM node:12-alpine as build

WORKDIR /app

# Установка зависимостей
COPY package*.json vue.config.js ./
RUN npm install

# Копирование остальных файлов проекта
COPY . .

# Собираем проект
RUN npm run build

# В результате получается образ, состоящий из одного слоя
FROM nginx:1.17.8-alpine

# Копируем собранные файлы из папки build в папку app
COPY --from=build /app/dist/ /app
COPY .docker/etc/nginx/conf.d/base.conf /etc/nginx/conf.d/default.conf

WORKDIR /app