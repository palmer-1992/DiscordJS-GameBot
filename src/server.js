require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const db = require("../config/database");

// Create prefx for commands
const PREFIX = "!";
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

// connect to DB
db();

bot.once("ready", () => {
  console.log(`Bot is Ready!`);
});

bot.on("message", async (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return; // Prevent BOT spamming server
  const id = message.author.tag; // Grab name#number name in discord

  if (message.content.startsWith(PREFIX)) {
    const [
      commandType,
      ...args
    ] = message.content
      .toLowerCase()
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    if (args.length > 2 || args[1] === NaN) {
      message.reply("All commands only allows for 2 paramters!");
      return;
    }

    // Creates user profile using discordID
    if (commandType === "createuser") {
      bot.commands.get("createuser").execute(message, args, id);
    }

    // Check specific game command
    if (commandType === "check") {
      bot.commands.get("check").execute(message, args, id);
    }

    // Add victory to game
    if (commandType === "won") {
      bot.commands.get("won").execute(message, args, id);
    }

    // Add new game property
    if (commandType === "add") {
      bot.commands.get("add").execute(message, args, id);
    }
  }
});

// login to Discord with your app's token
bot.login(process.env.BOT_TOKEN);
