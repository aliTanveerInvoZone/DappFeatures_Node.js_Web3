'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Activities', [
      {
        title: 'test title',
        date: new Date(),
        steps: 20,
        startTime: new Date(),
        endTime: new Date(),
        distance: '20 km',
        moveMinutes: '10 mins',
        notes: 'ajshdj',
        location: 'lahore',
        heartPoints: '20',
        caloriesBurnRate: '30',
        userID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Activities', null, {}),
};
