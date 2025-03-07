const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

//Link Schema to a model
const Fruit = mongoose.model("Fruit", fruitSchema);

//Export model
module.exports = Fruit;
