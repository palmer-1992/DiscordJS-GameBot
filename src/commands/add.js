const User = require("../../models/UserSchema");
const moment = require("moment");
const utils = require("../../utils/utils");

function createProperty(currentWins = 0, game) {
  // Use the matched games 'property' value
  // which acts as the property name for the new game object.
  const gameName = game.property;
  let gameWins = parseInt(currentWins);

  // Returns true if gameWins is not a number
  const is_String = isNaN(gameWins);
  if (is_String) {
    gameWins = 0;
  }

  // Creates key:value pair for new game object
  return {
    [gameName]: gameWins,
  };
}

module.exports = {
  name: "add",
  description: "Adds a new game property to DB document",

  async execute(message, args, id) {
    try {
      const data = await User.findOne({
        discordID: id,
      });
      if (!data) {
        return message.reply("No user exists, please create your profile!");
      }

      const doc = data.toObject();

      // Will return the game found or False
      const game = utils.searchForGame(args[0]);
      if (!game) {
        message.reply("There is no game with that name within the database!");
        throw Error("First param does not match any game in json file");
      }

      const property = game.property;

      // Returns new game property to set
      const newGame = createProperty(args[1], game);

      // Check if search term matches property on document
      // & return total wins for that game
      if (doc.hasOwnProperty(property)) {
        return message.reply(`You already have ${game.name} in your profile!`);
      } else {
        await User.findByIdAndUpdate(
          { _id: doc._id },
          { $set: newGame },
          { strict: false }
        ).then((result) => {
          return message.reply("A new game has been added to your profile");
        });
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
