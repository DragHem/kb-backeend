const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: { type: String, require },
  password: { type: String, require },
});

module.exports = mongoose.model("User", user);
