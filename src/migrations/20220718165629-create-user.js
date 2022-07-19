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
                type: Sequelize.STRING(60)
            },
            userName: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.ENUM('male', 'female', 'other')
            },
            lastVisited: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('NOW()')
            },
            isSuperUser: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
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