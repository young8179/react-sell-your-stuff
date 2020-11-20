const fs = require("fs");
const AWS = require("aws-sdk");
const dotenv = require('dotenv');
dotenv.config()
const { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET} = process.env
const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});
function uploadToS3(fileName) {
  const readStream = fs.createReadStream(fileName);
  const params = {
    Bucket: BUCKET_NAME,
    Key: "myapp" + "/" + fileName,
    Body: readStream
  };
  return new Promise((resolve, reject) => {
    s3bucket.upload(params, function(err, data) {
      readStream.destroy();
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}
module.exports = uploadToS3;