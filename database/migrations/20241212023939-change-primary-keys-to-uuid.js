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
    const tables = [
      'users',
      'roles',
      'profiles',
      'events',
      'presences',
      'certificates',
    ];
    for (const table of tables) {
      await queryInterface.changeColumn(table, 'id', {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      });
    }

    await queryInterface.changeColumn('profiles_role', 'profile_id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    });
    await queryInterface.changeColumn('profiles_role', 'role_id', {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
    });

    await queryInterface.changeColumn('certificates', 'event_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.changeColumn('certificates', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
    await queryInterface.changeColumn('certificates', 'file_id', {
      type: Sequelize.UUID,
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
  }
};
