const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Ingredients: {
    type: [String],
    required: true,
  },
  CookTime: {
    type: String,
  },
  MealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
  },
  Description: {
    type: String,
  },
  Notes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;