import fs from "fs";
import crypto from "crypto";
import util from "util";

import Product from "../models/Product";

const unlinkeFile = util.promisify(fs.unlink);

const { uploadFile, getFileStream } = require("../s3");

const imageController = {
  uploadFile: async (req, res) => {
    const file = req.file;
    const fileHash = crypto.randomBytes(10).toString("hex");
    const fileName = `${fileHash}.${file.originalname}`;

    const result = await uploadFile(file, fileName);
    await unlinkeFile(file.path);

    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ errors: ["Product is required"] });
    }

    const product = await Product.findByPk(product_id);

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
export default imageController;
