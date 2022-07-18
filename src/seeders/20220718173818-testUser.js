'use strict';

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
                password: 'qwerty',
                userName: 'MeridiZer',
                gender: 'male',
                isSuperUser: true
            },
            {
                login: 'Albertu',
                password: 'qwerty1',
                userName: 'Alba',
                gender: 'male',
                isSuperUser: false
            },
            {
                login: 'Gertrude',
                password: 'qwerty2',
                userName: 'Alba',
                gender: 'female',
                isSuperUser: false
            },
            {
                login: 'Poncha',
                password: 'qwerty3',
                userName: 'Alba',
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
