import Sequelize from "sequelize";

import databaseConfig from "../config/database";

import Adress from "../models/Adress";
import User from "../models/User";
import Product from "../models/Product";
import Category from "../models/Category";
import AdministrativeUser from "../models/AdministrativeUser";
import Role from "../models/Role";
import Request from "../models/Request";
import RequestProduct from "../models/RequestProduct";

const models = [
  User,
  Adress,
  Product,
  Category,
  AdministrativeUser,
  Role,
  Request,
  RequestProduct
];

const connection = new Sequelize(databaseConfig);
models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);

//Comando para criar migrates
//npx sequelize db:migration:create --name=products
//npx sequelize db:migrate

//Comando para criar seeds
//npx sequelize seed:generate --name crirar-usuarios
//npx sequelize db:seed:all
