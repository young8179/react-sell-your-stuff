'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Comments", "ProductId",{
      type: Sequelize.INTEGER,
      allowNull: false,
      reference:{
        model:"Products",
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
