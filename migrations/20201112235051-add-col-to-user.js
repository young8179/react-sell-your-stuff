'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Products", "complete",{
      type: Sequelize.BOOLEAN,
      // defaultValue: false,
      allowNull: false
      
    })
    await queryInterface.addColumn("Products", "category",{
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
