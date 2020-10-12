const mongoose = require("mongoose");

// database uri
const DB_URI = process.env.DB_URI


module.exports = async function () {
  try {
    await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connected...");
      })

  } catch (error) {
    console.log("DB connection error:", error.message)
    process.exit(1)
  }
}