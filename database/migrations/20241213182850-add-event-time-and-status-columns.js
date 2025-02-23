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
    await queryInterface.addColumn('events', 'start_at', {
      type: Sequelize.DATE(6),
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });
    await queryInterface.addColumn('events', 'end_at', {
      type: Sequelize.DATE(6),
    });
    await queryInterface.addColumn('events', 'status', {
      type: Sequelize.ENUM('started', 'ended', 'upcoming'),
      defaultValue: 'upcoming',
    });
    await queryInterface.addColumn('events', 'latitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.addColumn('events', 'longitude', {
      type: Sequelize.FLOAT,
      allowNull: false,
    });
    await queryInterface.addColumn('events', 'vagas', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.addIndex('events', ['start_at']);
    await queryInterface.addIndex('events', ['end_at']);
    await queryInterface.addIndex('events', ['status']);
    await queryInterface.addIndex('events', ['latitude']);
    await queryInterface.addIndex('events', ['longitude']);
    await queryInterface.addIndex('events', ['vagas']);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('events', 'start_at');
    await queryInterface.removeColumn('events', 'end_at');
    await queryInterface.removeColumn('events', 'status');
    await queryInterface.removeColumn('events', 'latitude');
    await queryInterface.removeColumn('events', 'longitude');
    await queryInterface.removeColumn('events', 'vagas');
    await queryInterface.removeIndex('events', ['start_at']);
    await queryInterface.removeIndex('events', ['end_at']);
    await queryInterface.removeIndex('events', ['status']);
    await queryInterface.removeIndex('events', ['latitude']);
    await queryInterface.removeIndex('events', ['longitude']);
    await queryInterface.removeIndex('events', ['vagas']);
  },
};
