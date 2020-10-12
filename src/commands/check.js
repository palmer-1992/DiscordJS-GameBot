const User = require("../../models/UserSchema");

module.exports = {
  name: "check",
  description: "Checks current game count score",

  async execute(message, args, id, { games }) {
    const data = await User.findOne({
      discordID: id,
    });

    if (!data) {
      message.reply("No user exists, please create your profile!");
      return;
    }

    // Converts mongoDB document to regular object
    // makes it possible to check property
    const doc = data.toObject();

    // Find first game that matches search term
    const match = games.find((element) => element.name.includes(args[0]));
    const property = match.property;

    // Loop over document & check if search term matches property
    // & return total wins for that game

    if (doc.hasOwnProperty(property)) {
      return message.reply(`You have ${doc[property]} wins on ${match.name}`);
    } else {
      return message.reply(
        `You need to add ${match.name}, try using !add [GAME] first`
      );
    }
  },
};
