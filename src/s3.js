import { config } from "dotenv";

config();

import fs from "fs";
import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadFile = (file, fileName) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
};

// export const getAllFiles = () => {
//   return new Promise((resolve, reject) => {
//     s3.listObjectsV2({ Bucket: bucketName }, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data.Contents);
//       }
//     });
//   });
// };

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.getObject(downloadParams).createReadStream();
};
