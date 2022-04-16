const mongoose = require("mongoose");

const JonathanSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.models.John || mongoose.model("John", JonathanSchema);
// if the model is already created then it will user the prev created instance or 
// else it will create new model