module.exports = {
  config: {
    name: "ck",
    aliases: ["check", "verify"],
    version: "1.0",
    author: "LIKHON AHMED",
    countDown: 3,
    role: 1, 
    description: "Check something important",
    category: "utility",
    guide: "{pn} – Use this command to check something"
  },

  execute: async (ctx, bot) => {
    try {
      await ctx.reply("✅ CK command executed successfully!");
    } catch (error) {
      console.error("Error in /ck command:", error);
      ctx.reply("⚠️ Something went wrong while executing /ck.");
    }
  }
};
