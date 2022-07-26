'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likeables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        noUpdate: true,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likeables');
  }
};