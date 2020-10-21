const User = require("../../models/UserSchema");
const moment = require("moment");
const utils = require("../../utils/utils");

module.exports = {
  name: "won",
  description: "Increments the score of the game property",

  async execute(message, args, id) {
    try {
      const data = await User.findOne({
        discordID: id,
      });

      if (!data) {
        return message.reply("No user exists, please create your profile!");
      }

      // Find first game that matches search term
      const game = utils.searchForGame(args[0]);
      if (!game) {
        message.reply("There is no game with that name within the database!");
        throw Error("First param does not game any game in json file");
      }
      const property = game.property;

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
            `You now have ${newDoc[property]} wins on ${game.name}`
          );
        });
      } else {
        return message.reply(
          `You need to add ${game.name}, try using !add [GAME] first`
        );
      }
    } catch (error) {
      const err = {
        message: error.message,
        stack: error.stack,
        timestamp: moment().format("DD-MM-YYYY hh:mm:ss A"),
      };
      console.log(err);
    }
  },
};
