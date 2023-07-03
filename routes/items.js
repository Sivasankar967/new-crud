const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description
    });
    await newItem.save();
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send('An error occurred.');
  }
});


router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.render('index', { items });
  } catch (error) {
    console.error(error);
    res.send('An error occurred.');
  }
});


router.get('/edit/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.render('edit', { item });
  } catch (error) {
    console.error(error);
    res.send('An error occurred.');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const updatedItem = {
      name: req.body.name,
      description: req.body.description
    };
    await Item.findByIdAndUpdate(req.params.id, updatedItem);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send('An error occurred.');
  }
});


router.get('/delete/:id', async (req, res) => {
  try {
    await Item.findByIdAndRemove(req.params.id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.send('An error occurred.');
  }
});

module.exports = router;
