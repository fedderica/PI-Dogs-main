const { Router } = require('express');
const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db.js');
const router = Router();

router.post('/', async (req, res) => {
  const { name, height, weight, lifeSpan, image, temperament } = req.body;
  const foundDog = await Dog.findOne({ where: { name } });
  if (foundDog) throw new Error('Dog already exists');
  const newDog = await Dog.create({
    name,
    height,
    weight,
    lifeSpan,
    image,
  });
  const foundTemperaments = await Temperament.findAll({
    where: { name: { [Op.in]: temperament } },
  });
  await newDog.addTemperaments(foundTemperaments);
  const formatedDog = {
    id: newDog.id,
    name,
    weight,
    image,
    temperament: temperament.join(', '),
  };
  console.log(formatedDog);
  res.json(formatedDog);
});

module.exports = router;