const { STRING, UUID, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    height: {
      type: STRING,
      allowNull: false,
    },
    weight: {
      type: STRING,
      allowNull: false,
    },
    lifeSpan: {
      type: STRING,
    },
    image: {
      type: STRING,
    },
  });
};