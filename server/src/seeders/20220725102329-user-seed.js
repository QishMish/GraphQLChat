'use strict';

const { hashPassword } = require('../utils/jwt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@gmail.com',
          username: 'admin',
          password: await hashPassword('admin'),
          verified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'mishikoqajaia50@gmail.com',
          username: 'misho',
          verified: true,
          password: await hashPassword('misho'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'john@gmail.com',
          username: 'john',
          verified: false,
          password: await hashPassword('john'),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
