const User = require("../../models/UserSchema");

module.exports = {
  name: 'createuser',
  description: 'Creates new user based on DiscordID',

  async execute(message, args, id) {
    const exist = await User.findOne({
      discordID: id,
    });
    if (!exist) {
      // create new document in DB based on userTag
      const newUser = new User({
        discordID: id,
      });

      const data = await newUser.save();
      message.reply("Your profile has been created");

      if (!data) throw new Error("No data for this Discord user");
    } else {
      return message.reply("Profile already exists");
    }
  }
}