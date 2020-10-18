const User = require("../../models/UserSchema");

module.exports = {
  name: "won",
  description: "Increments the score of the game property",

  async execute(message, args, id, { games }) {
    const data = await User.findOne({
      discordID: id,
    });

    if (!data) {
      return message.reply("No user exists, please create your profile!");
    }

    // Find first game that matches search term
    const match = games.find((element) => element.search.includes(args[0]));
    const property = match.property;

    // Converts mongoDB document to regular object
    // makes it possible to check properties
    const doc = data.toObject();

    if (doc.hasOwnProperty(property)) {
      await User.findByIdAndUpdate(
        { _id: doc._id },
        { $inc: { [property]: 1 } },
        { new: true, strict: false }
      ).then((data) => {
        const newDoc = data.toObject();

        return message.reply(
          `You now have ${newDoc[property]} wins on ${match.name}`
        );
      });
    } else {
      return message.reply(
        `You need to add ${match.name}, try using !add [GAME] first`
      );
    }
  },
};
