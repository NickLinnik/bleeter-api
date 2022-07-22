const {User} = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        login: 'Chokidar',
        password: await User.getPasswordHash('qwerty1'),
        userName: 'Usepolling',
        gender: 'male',
        isSuperUser: true
      },
      {
        login: 'Albertu',
        password: await User.getPasswordHash('qwerty2'),
        userName: 'Alba',
        gender: 'male',
        isSuperUser: false
      },
      {
        login: 'Gertrude',
        password: await User.getPasswordHash('qwerty3'),
        userName: 'Gertrude',
        gender: 'female',
        isSuperUser: false
      },
      {
        login: 'Poncha',
        password: await User.getPasswordHash('qwerty4'),
        userName: 'Panzerschreck',
        gender: 'other',
        isSuperUser: false
      }
    ]);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
