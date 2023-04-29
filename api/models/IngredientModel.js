const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: "Please enter a name for your food items"
  }
});

IngredientSchema.index({
  name: "text",
});

// ***** expiry and portions will eventually be moved to FoodItem

module.exports = mongoose.model("Ingredient", IngredientSchema);