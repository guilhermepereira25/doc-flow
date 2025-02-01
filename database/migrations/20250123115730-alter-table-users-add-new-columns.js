'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn('users', 'email', {
      type: Sequelize.STRING(254),
    });

    await queryInterface.addColumn('users', 'enrollment', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.renameColumn('users', 'username', 'full_name');
    await queryInterface.changeColumn('users', 'full_name', {
      type: Sequelize.STRING(100),
    });

    await queryInterface.addIndex('users', ['email']);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('users', ['email']);
    await queryInterface.removeColumn('users', 'email');
    await queryInterface.removeColumn('users', 'enrollment');
    await queryInterface.renameColumn('users', 'full_name', 'username');
  },
};
