"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _dotenv = require('dotenv');

_dotenv.config.call(void 0, );

var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _s3 = require('aws-sdk/clients/s3'); var _s32 = _interopRequireDefault(_s3);

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_BUCKET_ACESS_KEY;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY;

const s3 = new (0, _s32.default)({
  region,
  accessKeyId,
  secretAccessKey,
});

 const uploadFile = (file, fileName) => {
  const fileStream = _fs2.default.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: fileName,
  };

  return s3.upload(uploadParams).promise();
}; exports.uploadFile = uploadFile;

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

 const getFileStream = (fileKey) => {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  return s3.getObject(downloadParams).createReadStream();
}; exports.getFileStream = getFileStream;
