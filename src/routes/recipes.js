const express = require('express');
const { prisma } = require('../db');

const router = express.Router();

// List
router.get('/', async (req, res) => {
  const recipes = await prisma.recipe.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('recipes/index', { recipes });
});

// New form
router.get('/new', (req, res) => {
  res.render('recipes/new');
});

// Create
router.post('/', async (req, res) => {
  const { title, ingredients, instructions } = req.body;
  await prisma.recipe.create({
    data: { title, ingredients, instructions }
  });
  res.redirect('/recipes');
});

// Show
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return res.status(404).send('Not found');
  res.render('recipes/show', { recipe });
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const recipe = await prisma.recipe.findUnique({ where: { id } });
  if (!recipe) return res.status(404).send('Not found');
  res.render('recipes/edit', { recipe });
});

// Update
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, ingredients, instructions } = req.body;
  await prisma.recipe.update({
    where: { id },
    data: { title, ingredients, instructions }
  });
  res.redirect(`/recipes/${id}`);
});

// Delete
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await prisma.recipe.delete({ where: { id } });
  res.redirect('/recipes');
});

module.exports = router;


