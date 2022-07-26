'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        noUpdate: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING(4096),
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {model: 'users', key: 'id'},
        allowNull: false,
        noUpdate: true,
      },
      likeableId: {
        type: Sequelize.INTEGER,
        references: {model: 'likeables', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
        noUpdate: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {model: 'posts', key: 'id'},
        noUpdate: true,
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
    await queryInterface.dropTable('comments');
  }
};