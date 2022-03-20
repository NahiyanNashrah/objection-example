const { Model } = require('objection');

class Movie extends Model {
  static get tableName() {
    return 'movies';
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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string', minLength: 3, maxLength: 255 },
      }
    };
  };

  static relationMappings() {
    const Person = require('./person');

    return {
      actors: {
        relation: Model.ManyToManyRelation,
  
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one.
        modelClass: Person,
  
        join: {
          from: 'movies.id',
          // ManyToMany relation needs the `through` object to describe the join table.
          through: {
            from: 'persons_movies.movie_id',
            to: 'persons_movies.person_id',
          },
          to: 'persons.id',
        },
      }
    }
  };
};

module.exports = Movie;




