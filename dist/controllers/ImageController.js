"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _crypto = require('crypto'); var _crypto2 = _interopRequireDefault(_crypto);
var _util = require('util'); var _util2 = _interopRequireDefault(_util);

var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

const unlinkeFile = _util2.default.promisify(_fs2.default.unlink);

const { uploadFile, getFileStream } = require("../s3");

const imageController = {
  uploadFile: async (req, res) => {
    const file = req.file;
    const fileHash = _crypto2.default.randomBytes(10).toString("hex");
    const fileName = `${fileHash}.${file.originalname}`;

    const result = await uploadFile(file, fileName);
    await unlinkeFile(file.path);

    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ errors: ["Product is required"] });
    }

    const product = await _Product2.default.findByPk(product_id);

    if (!product) {
      return res.status(400).json({ errors: ["Product not found"] });
    }

    product.update(
      {
        image_key: result.Key,
      },
      {
        where: {
          product_id,
        },
      }
    );

    return res.status(200).json(product);
  },

  // getImages: async (req, res) => {
  //   const contents = await getAllFiles();
  //   return res.json(contents.map((content) => content.Key));
  // },

  getImagesByKey: (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
  },
};
exports. default = imageController;
