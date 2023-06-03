"use strict";module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "products",
      [
        {
          name: "Camiseta Nike",
          description: "Camiseta nike branca",
          price: 15,
          image_key: "",
          packaging: "un",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Camiseta adidas",
          description: "Camiseta adidas branca",
          price: 15,
          image_key: "",
          packaging: "un",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Camiseta onbongo",
          description: "Camiseta onbongo vinho",
          price: 15,
          image_key: "",
          packaging: "un",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Bone lacoste",
          description: "Bone lacoste preto",
          price: 13,
          image_key: "",
          packaging: "un",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Air jordan",
          description: "Air jordan vermelho e branco",
          price: 13,
          image_key: "",
          packaging: "un",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Vans",
          description: "Amarelo e preto",
          price: 13,
          image_key: "",
          packaging: "un",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete("products", null, {}),
};
