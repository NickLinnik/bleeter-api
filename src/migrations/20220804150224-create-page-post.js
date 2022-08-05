'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('page_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pageId: {
        type: Sequelize.INTEGER,
        references: {model: 'pages', key: 'id'},
        onDelete: 'CASCADE',
        noUpdate: true,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {model: 'posts', key: 'id'},
        onDelete: 'RESTRICT',
        noUpdate: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('page_posts');
  }
};