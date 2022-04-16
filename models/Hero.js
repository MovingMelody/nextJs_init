const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema({
  superHero: {
    type: String,
    required: [true, "please fill this field"],
    unique: true,
    trim: true,
  },
  realName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
