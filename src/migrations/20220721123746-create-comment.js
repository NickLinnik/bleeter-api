'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING(4096),
        allowNull: false
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
      postId: {
        type: Sequelize.INTEGER,
        references: {model: 'posts', key: 'id'}
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
    await queryInterface.dropTable('comments');
  }
};