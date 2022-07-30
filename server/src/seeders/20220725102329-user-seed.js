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
          firstname: 'admin',
          lastname: 'admin',
          password: await hashPassword('admin'),
          verified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'mishikoqajaia50@gmail.com',
          username: 'misho',
          firstname: 'misho',
          lastname: 'misho',
          password: await hashPassword('misho'),
          verified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'john@gmail.com',
          username: 'john',
          firstname: 'john',
          lastname: 'john',
          password: await hashPassword('john'),
          verified: false,
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
