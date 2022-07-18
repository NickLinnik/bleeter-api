'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {model: 'users', key: 'id'}
            },
            text: {
                type: Sequelize.STRING(2000)
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
        await queryInterface.dropTable('posts');
    }
};