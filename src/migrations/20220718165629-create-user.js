'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                noUpdate: true,
                type: Sequelize.INTEGER
            },
            login: {
                type: Sequelize.STRING(40),
                noUpdate: true,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(60),
                allowNull: false
            },
            userName: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.ENUM('male', 'female', 'other'),
            },
            admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                noUpdate: true,
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