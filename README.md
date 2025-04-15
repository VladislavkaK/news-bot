## telegram news bot

### Project structure
    - src
      - bot.ts # логика бота
      - fetcher.ts # работа с RSS
      - cron.ts # планировщик
      - db.ts # работа с БД
    - .env
    - tsconfig.json
    - package.json

### Firstly build project

    - npx tsc

### Secondly run project

    - npx ts-node-dev src/bot.ts
