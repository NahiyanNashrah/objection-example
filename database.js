const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'objection-example',
  }
});

// Give the knex instance to objection.
Model.knex(knex);

module.exports = knex;