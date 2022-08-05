import {User} from '../models';

module.exports = {
  async up() {
    await User.bulkCreate([
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
    //   await queryInterface.bulkInsert('users', [
    //     {
    //       login: 'Chokidar',
    //       password: await User.hashPassword('qwerty1'),
    //       userName: 'Usepolling',
    //       gender: 'male',
    //       admin: true
    //     },
    //     {
    //       login: 'Albertu',
    //       password: await User.hashPassword('qwerty2'),
    //       userName: 'Alba',
    //       gender: 'male',
    //       admin: false
    //     },
    //     {
    //       login: 'Gertrude',
    //       password: await User.hashPassword('qwerty3'),
    //       gender: 'female',
    //       admin: false
    //     },
    //     {
    //       login: 'Poncha',
    //       password: await User.hashPassword('qwerty4'),
    //       userName: 'Panzerschreck',
    //       gender: 'other',
    //       admin: false
    //     }
    //   ]);
  },
  
  async down() {
    // await queryInterface.bulkDelete('users', null, {});
    await User.destroy({where: {}});
  }
};
