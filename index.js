const Person = require('./models/person');
const Movie = require('./models/movie');
const Animal = require('./models/animal');
const knex = require('./database');

async function main() {
  // Delete all customers/orders from db
  // await Customer.query().delete();
  // await Order.query().delete();

  // Insert person/movie to the db
  // const person = await Person.query().insert({ name: 'Dulquer'});
  // const movie = await Movie.query().insert({ name: 'Solo'});

  // const actors = await Movie.relatedQuery('actors')
  //                 .for(2)
  //                 .relate(5);

  // Insert a new pet for a Person.
  await Person.relatedQuery('pets').for(2).insert({
    name: 'Snoopy',
    species: 'dog',
  });

  // Update person name
  // await Person.query().findById(2).patch({ name: 'Nithya' });
  
  // Read all rows from the db
  const allMovie = await Movie.query();
  const allPerson = await Person.query();
  const allAnimal = await Animal.query();
  console.log({ allPerson }, { allMovie }, { allAnimal });
}

main()
  .then(() => knex.destroy())
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });