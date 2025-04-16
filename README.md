## telegram news bot

### Project structure
    - src
      - bot.ts # bot logic
      - fetcher.ts
      - cron.ts
      - db.ts
    - .env
    - tsconfig.json
    - package.json

### You need to add your BOT_TOKEN and POSTGRES_URI and add .env file with following fields:

POSTGRES_URI=postgres://<name_user>:<password_user>@localhost:5432/<name_bd>
BOT_TOKEN=<YOUR_TG_BOT_TOKEN>

### Firstly build project

    - npx tsc

### Secondly run project

    - npx ts-node-dev src/bot.ts
