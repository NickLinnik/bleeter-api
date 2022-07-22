'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {model: 'users', key: 'id'},
          allowNull: false
        },
        likeableId: {
          type: Sequelize.INTEGER,
          references: {model: 'likeables', key: 'id'},
          allowNull: false
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
      },
      {
        uniqueKeys: {
          UserAndTargetUnique: {
            fields: ['userId', 'likeableId']
          }
        }
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
  }
};