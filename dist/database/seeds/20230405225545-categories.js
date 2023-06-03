"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Camisetas",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Tenis",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bone",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Calça",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete("categories", null, {}),
};
