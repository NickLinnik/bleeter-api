const {User} = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        login: 'Chokidar',
        password: await User.hashPassword('qwerty1'),
        userName: 'Usepolling',
        gender: 'male',
        admin: true
      },
      {
        login: 'Albertu',
        password: await User.hashPassword('qwerty2'),
        userName: 'Alba',
        gender: 'male',
        admin: false
      },
      {
        login: 'Gertrude',
        password: await User.hashPassword('qwerty3'),
        gender: 'female',
        admin: false
      },
      {
        login: 'Poncha',
        password: await User.hashPassword('qwerty4'),
        userName: 'Panzerschreck',
        gender: 'other',
        admin: false
      }
    ]);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
