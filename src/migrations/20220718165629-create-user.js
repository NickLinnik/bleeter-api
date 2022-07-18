'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            login: {
                type: Sequelize.STRING(40),
                unique: true
            },
            password: {
                type: Sequelize.STRING(40)
            },
            userName: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.ENUM('male', 'female', 'other')
            },
            lastVisited: {
                type: Sequelize.DATE
            },
            isSuperUser: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('NOW()')
            },
            updatedAt: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('NOW()')
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};