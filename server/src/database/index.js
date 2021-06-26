import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    this.connection
      .authenticate()
      .then(() => {
        console.log('Postgres Connected Successfully');
      })
      .catch(err =>
        console.log('Postgres Unable Connect to the Database', err)
      );

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
