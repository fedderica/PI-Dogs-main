module.exports = {
    formatApiDogs(apiDogs) {
      return apiDogs.map((dog) => {
        return {
          id: dog.id,
          name: dog.name,
          weight: dog.weight.metric,
          image: dog.image.url,
          temperament: dog.temperament,
        };
      });
    },
  
    formatDbDogs(dbDogs) {
      return dbDogs.map((dog) => {
        return {
          id: dog.id,
          name: dog.name,
          weight: dog.weight,
          image: dog.image,
          temperament: dog.temperaments.map((b) => b.name).join(', '),
        };
      });
    },
  
    formatApiDog({ id, name, weight, height, life_span, image, temperament }) {
      return {
        id,
        name,
        weight: weight.metric,
        height: height.metric,
        lifeSpan: life_span,
        image: image.url,
        temperament,
      };
    },
  
    formatDbDog({ id, name, weight, height, lifeSpan, image, temperaments }) {
      return {
        id,
        name,
        weight,
        height,
        lifeSpan,
        image,
        temperament: temperaments.map((t) => t.name).join(', '),
      };
    },
  };