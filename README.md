# NODE_EXPRESS_TEMPLATE

simple telegram bot to automate tracking of lunch breaks

// TODO fix rule, startTime, chatid and starting DB + start dyno / dyno is gmt+0
to set the bot

> provide the ENV VARS `CHAT_ID` and `TG_KEY`
> set the correct `rule`
> set the `startTime` and `endTime`
> make sure to initialize the correct starting db under `api/db.json`
> keep in mind the deployment machine `timezone` when setting cron recurrence
> for heroku: set correct `CHAT_ID`, `TG_KEY` and start correct dyno
