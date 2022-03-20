const { Model } = require('objection');

class Person extends Model {
  static get tableName() {
    return 'persons';
  };

  // $beforeInsert() {
  //   this.createdAt = new Date();
  // };

  // $beforeUpdate() {
  //   this.updatedAt = new Data();
  // };

  static get nameColumn() {
    return 'name';
  };

  // static get tokenColumn() {
  //   return 'token';
  // };

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3, maxLength: 255 },
        // token: { type: 'string' },
        // createdAt: { type: 'string' },
        // updatedAt: { type: 'string' },
      }
    };
  };

  static relationMappings () {
    const Movie = require('./movie');
    const Animal = require('./Animal');
    
    return {
      pets: {
        relation: Model.HasManyRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: Animal,
        join: {
          from: 'persons.id',
          to: 'animals.owner_id',
        },
      },
      movies: {
        relation: Model.ManyToManyRelation,
        modelClass: Movie,
        join: {
          from: 'persons.id',
          // ManyToMany relation needs the `through` object
          // to describe the join table.
          through: {
            // If you have a model class for the join table
            // you need to specify it like this:
            // modelClass: PersonMovie,
            from: 'persons_movies.person_id',
            to: 'persons_movies.movie_id'
          },
          to: 'movies.id'
        }
      },
    };
  };
};

module.exports = Person;
