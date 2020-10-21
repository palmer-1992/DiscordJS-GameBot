const fs = require("fs");

// Import & Parse Game store
const rawData = fs.readFileSync("./src/games.json");
const gameStore = JSON.parse(rawData);

// Will return a matched game object OR
// false so module can handle response to client
exports.searchForGame = function (query) {
  const { games } = gameStore;

  const game_exists = games.find((element) => element.search.includes(query));
  if (!game_exists) {
    return false;
  }

  return game_exists;
};
