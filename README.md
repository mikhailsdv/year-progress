# year-progress

Telegram channel that monitors year progress in percents.

## [Deta](https://www.deta.sh/)

This project is hosted no [Deta Micros](https://docs.deta.sh/docs/micros/about). It uses [Deta Base](https://docs.deta.sh/docs/base/about) to save the progress state and [Deta Cron](https://docs.deta.sh/docs/micros/cron) to execute the script every day.

## How to set up?

1. Read the [docs](https://docs.deta.sh/docs/home);
2. Install [Deta CLI](https://docs.deta.sh/docs/cli/install);
3. Create new Micro and enable visor:

```
deta new --node year-progress
deta visor enable
```

4. Clone repo files into just created folder:

```
git clone https://github.com/mikhailsdv/year-progress.git
```

5. Go to the root folder and install dependencies:

```
npm i
```

6. In the root folder, rename `.env.example` to `.env`. Open it with your code editor and fill the missing variables. All the variables are well-commented. Then update your Micro's environment variables:

```
deta update -e .env
```

7. Set a cron job:

```
deta cron set "0 14 * * ? *" //run at 14:00 am(UTC) every day
```

That's it. If nothing works, try running your code manually: `node src/test.js`, or take a look at your Micro's visor.

## Links

1. [Channel itself](https://t.me/YearProgressBar)
2. [Developer's blog](https://t.me/FilteredInternet)
