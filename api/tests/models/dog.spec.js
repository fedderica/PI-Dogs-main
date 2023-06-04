const { Dog, conn } = require('../../src/db.js');



describe('Dog model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    it('should create a new Dog if it has a valid name, height and weight', (done) => {
      Dog.create({
        name: 'Rapper Yorkie',
        height: '15 - 23',
        weight: '4 - 10',
      })
        .then(() => done())
        .catch(() => done(new Error('It requires a valid name')));
    });
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({
          height: '15 - 23',
          weight: '4 - 10',
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
    });
    describe('height', () => {
      it('should throw an error if height is null', () => {
        Dog.create({
          name: 'Rapper Yorkie',
          weight: '4 - 10',
        })
          .then(() => done(new Error('It requires a valid height')))
          .catch(() => done());
      });
    });
    describe('weight', () => {
      it('should throw an error if weight is null', () => {
        Dog.create({
          name: 'Rapper Yorkie',
          height: '15 - 23',
        })
          .then(() => done(new Error('It requires a valid weight')))
          .catch(() => done());
      });
    });
  });
});