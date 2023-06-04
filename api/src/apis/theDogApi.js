require('dotenv').config();
const axios = require('axios');
const { DOG_API_KEY } = process.env;

module.exports = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  headers: {
    'x-api-key': DOG_API_KEY,
  },
});