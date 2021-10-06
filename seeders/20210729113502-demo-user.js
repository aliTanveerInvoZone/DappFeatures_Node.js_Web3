/* eslint-disable strict */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('users', [
      {
        name: 'test User',
        weight: '20 kg',
        height: '5ft 8in',
        DOB: new Date(),
        stepsGoal: 100,
        heartPointsGoal: '100',
        sleepTime: new Date(),
        awakeTime: new Date(),
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
