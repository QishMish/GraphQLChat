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
        {
          email: 'tom@gmail.com',
          username: 'tom',
          firstname: 'tom',
          lastname: 'tom',
          password: await hashPassword('tom'),
          verified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'ana@gmail.com',
          username: 'ana',
          firstname: 'ana',
          lastname: 'ana',
          password: await hashPassword('ana'),
          verified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'liza@gmail.com',
          username: 'liza',
          firstname: 'liza',
          lastname: 'liza',
          password: await hashPassword('liza'),
          verified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'mark@gmail.com',
          username: 'mark',
          firstname: 'mark',
          lastname: 'mark',
          password: await hashPassword('mark'),
          verified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          email: 'beth@gmail.com',
          username: 'beth',
          firstname: 'beth',
          lastname: 'beth',
          password: await hashPassword('beth'),
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
