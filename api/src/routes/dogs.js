const { Router } = require('express');
const _ = require('lodash');
const theDogApi = require('../apis/theDogApi');
const { Dog, Temperament } = require('../db.js');
const {
  formatApiDog,
  formatApiDogs,
  formatDbDog,
  formatDbDogs,
} = require('./formatFunctions');

const router = Router();

router.get('/', async (req, res) => {
  // Obtener y dar formato a las razas de la Api
  const { data } = await theDogApi.get('/dogs');
  const apiDogs = formatApiDogs(data);
  // Obtener y dar formato a las razas de la Db
  const dbData = await Dog.findAll({ include: Temperament });
  const dbDog = formatDbDogs(dbData);
  // Concatenar todas las razas
  let allDogs = apiDogs.concat(dbDogs);
  // Si existe un query name, filtrar por name
  const { name } = req.query;
  if (name) {
    allDogs = allDogs.filter((dog) =>
      dog.name.toUpperCase().includes(name.toUpperCase())
    );
    // Si no existe ninguna raza con ese nombre, enviar error
    if (!allDogs.length)
      return res.status(400).json({ message: 'Dog not found' });
  }
  // Enviar las razas
  return res.json(allDogs);
});

router.get('/:dogId', async (req, res) => {
  const dogId = req.params.dogId;
  // Buscar breed en la Api
  const { data } = await theDogApi.get('/dogs');
  const foundApiDog = data.find((Dog) => dog.id.toString() === dogId);
  // Si se encuentra en la Api, darle formato y enviarla
  if (foundApiDog) {
    const apiDog = formatApiDog(foundApiDog);
    return res.json(apiDog);
  }
  // Buscar breed en la Db
  const foundDbDog = await Dog.findOne({
    where: { id: DogId },
    include: Temperament,
  });
  // Si se encuentra en la Db, darle formato y enviarla
  if (foundDbDog) {
    const dbDog = formatDbDog(foundDbDog);
    return res.json(dbDog);
  }
  // Si no se encuentra, enviar mensaje que lo indique
  res.json({ message: 'Dog does not exist' });
});

module.exports = router;