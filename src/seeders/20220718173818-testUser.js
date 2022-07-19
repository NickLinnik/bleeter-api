'use strict';
const models = require('../models');
const {User} = models

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('users', [
            {
                login: 'Nick',
                password: await User.getPasswrodHash('qwerty3'),
                userName: 'MeridiZer',
                gender: 'male',
                isSuperUser: true
            },
            {
                login: 'Albertu',
                password: await User.getPasswrodHash('qwerty3'),
                userName: 'Alba',
                gender: 'male',
                isSuperUser: false
            },
            {
                login: 'Gertrude',
                password: await User.getPasswrodHash('qwerty3'),
                userName: 'Gertrude',
                gender: 'female',
                isSuperUser: false
            },
            {
                login: 'Poncha',
                password: await User.getPasswrodHash('qwerty3'),
                userName: 'Panzerschreck',
                gender: 'other',
                isSuperUser: false
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {})
    }
};
