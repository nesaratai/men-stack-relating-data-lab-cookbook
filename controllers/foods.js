const express = require('express');
const router = express.Router();
const Food = require('../models/food.js');

// New recipe form
router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
});

// List all food recipes
router.get('/', async (req, res) => {
  try {
    const allFoods = await Food.find();
    res.render('foods/index.ejs', {
      foods: allFoods,           
      user: req.session.user     
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Get show page for each recipe
router.get('/:foodId', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId).populate('user');
    res.render('foods/show.ejs', { food, user: req.session.user });
  } catch (error) {
    console.log(error);
    res.redirect('/foods');
  }
});

// Get the edit recipe page
router.get('/:foodId/edit', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    res.render('foods/edit.ejs', { food: food, user: req.session.user });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Create a new recipe
router.post('/', async (req, res) => {
  try {
    
    const newFood = new Food({
      Title: req.body.Title,
      Ingredients: req.body['Ingredients[]'] || [],  
      CookTime: req.body.CookTime,
      MealType: req.body.MealType,
      Description: req.body.Description,
      Notes: req.body.Notes,
      user: req.session.user._id,  
    });

    await newFood.save();
    res.redirect(`/foods`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

// Update an existing food item 
router.put('/:foodId', async (req, res) => {
  try {
    let ingredients = req.body.Ingredients;

    // Normalize ingredients to an array
    if (typeof ingredients === 'string') {
      ingredients = ingredients.split(',').map(i => i.trim());
    } else if (Array.isArray(ingredients)) {
      ingredients = ingredients.map(i => i.trim()).filter(Boolean);
    } else {
      ingredients = [];
    }

    const updatedData = {
      ...req.body,
      Ingredients: ingredients,
    };

    await Food.findByIdAndUpdate(req.params.foodId, updatedData);
    res.redirect(`/foods/${req.params.foodId}`);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});


// Delete a food item
router.delete('/:foodId', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.foodId);
    res.redirect('/foods');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});

module.exports = router;