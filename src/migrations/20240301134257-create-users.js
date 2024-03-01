"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
