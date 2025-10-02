const fs = require("fs");
const path = require("path");
const config = require("./config.json");
const logger = require("./src/utils/logger");

module.exports = (bot) => {
  const commandsPath = path.resolve(__dirname, config.commands.folder);
  fs.readdirSync(commandsPath).forEach((file) => {
    if (file.endsWith(".js")) {
      const command = require(path.join(commandsPath, file));
      bot.command(command.name, async (ctx) => {
        try {
          if (command.adminOnly) {
            const isAdmin = config.admins.some(admin => admin.id === ctx.from.id);
            if (!isAdmin) return ctx.reply("❌ You are not allowed to use this command.");
          }
          await command.execute(ctx, bot);
          if (config.logging.enabled) logger.log(`Command executed: /${command.name} by ${ctx.from.username}`);
        } catch (err) {
          console.error(`Error in /${command.name}:`, err);
          ctx.reply("⚠️ Something went wrong while executing this command.");
        }
      });
    }
  });

  if (config.features.welcomeMessage) {
    bot.on("new_chat_members", (ctx) => {
      ctx.message.new_chat_members.forEach((user) => {
        ctx.reply(`Welcome ${user.first_name} 👋 to the chat!`);
      });
    });
  }

  if (config.features.antiSpam) {
    bot.on("message", (ctx, next) => {
      next();
    });
  }

  console.log("✅ All commands loaded and main bot logic is active!");
};
