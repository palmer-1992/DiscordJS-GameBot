const User = require("../../models/UserSchema");

function newProperty(searchTerm, currentWins = 0, gameStore) {
  const { games } = gameStore;

  // Find first game that matches search term
  const match = games.find((element) => element.name.includes(searchTerm));
  if (!match) return false;

  // Use the matched games 'property' value
  // which acts as the property name for the new game object.
  const gameName = match.property;
  const gameWins = parseInt(currentWins);

  // Creates key:value pair for new game object
  return {
    [gameName]: gameWins,
  };
}

module.exports = {
  name: "add",
  description: "Adds a new game property to DB document",

  async execute(message, args, id, gameStore) {
    const doc = await User.findOne({
      discordID: id,
    });
    if (!doc) {
      message.reply("No user exists, please create your profile!");
      return;
    }

    // Returns new game property to set
    const newGame = newProperty(args[0], args[1], gameStore);
    if (!newGame) {
      return message.reply(
        "There is no game with that name within the database!"
      );
    }

    if (doc) {
      await User.findByIdAndUpdate(
        { _id: doc._id },
        { $set: newGame },
        { strict: false }
      ).then((result) => {
        return message.reply("A new game has been added to your profile");
      });
    }
  },
};
