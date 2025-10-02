const { Telegraf } = require("telegraf");
const config = require("./config.json");
const bot = new Telegraf(config.bot.token);
require("./main")(bot);

bot.launch().then(() => {
  console.log(`✅ Bot started as @${config.bot.username}`);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
