import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

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
      .catch((err) =>
        console.log('Postgres Unable Connect to the Database', err)
      );

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
