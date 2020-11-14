'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Comments", "UserId",{
      type: Sequelize.INTEGER,
      allowNull: false,
      reference:{
        model:"Users",
        key:"id"
      }
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
