"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "roles",
      [
        {
          role: 'administrador',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          role: 'usuario',
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete("roles", null, {}),
};
