'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('events', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.addColumn('events', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('events', 'latitude');
    await queryInterface.removeColumn('events', 'longitude');
  },
};
