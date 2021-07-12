import { Model, Sequelize } from 'sequelize';

class SchedulerTime extends Model {
  static init(sequelize) {
    super.init(
      {
        time: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'schedulers-time',
        freezeTableName: true,
      }
    );

    return this;
  }
}

export default SchedulerTime;
