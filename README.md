# Daily-bot-front

## Сборка production
1. Нужно создать `.env.production` файл, который включает в себя:
    * `VUE_APP_HOST` - адрес приложения (например, `https://daily-bot.b2bfamily.com`)
    * `VUE_APP_API_HOST` - адрес api daily-bot (например, `https://daily-bot.b2bfamily.com/api`)
    * `VUE_APP_SLACK_CLIENT` - значение *Client ID* из вкладки *Basic Information* вашего Slack приложения 
2. Установить зависимости
```
yarn install
```
3. Выполнить команду
```
yarn build
```
4. Забрать приложение из директории `./dist`

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
