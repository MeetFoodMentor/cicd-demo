const fs = require('fs');
const aws = require('aws-sdk');
const config = require('../config/production');
const { addTimeStampToName, getFileBaseName } = require('../util/path');

const setS3Credentials = new aws.S3({
  accessKeyId: config.S3AccessKeyID,
  secretAccessKey: config.S3SecretAccessKey,
});

const s3ProfilePhotoParams = (req) => {
  return {
    ACL: 'public-read',
    Bucket: config.S3ProfilePhotoBucketName,
    Body: fs.createReadStream(req.file.path),
    Key: addTimeStampToName(req.file.originalname),
  };
};

const s3CustomerCoverImageParams = (req) => {
  return {
    ACL: 'public-read',
    Bucket: config.S3CoverImageBucketName,
    Body: fs.createReadStream(req.file.path),
    Key: addTimeStampToName(req.file.originalname),
  };
};

const s3CustomerVideoParams = (req) => {
  return {
    ACL: 'public-read',
    Bucket: config.S3VideoBucketName,
    Body: fs.createReadStream(req.file.path),
    Key: addTimeStampToName(req.file.originalname),
  };
};

const videoUrlGenerator = (fileName) => {
  return `${config.S3VideoUrlPrefix}/${fileName}`;
};

const profilePhotoUrlGenerator = (fileName) => {
  return `${config.S3ProfilePhotoUrlPrefix}/${fileName}`;
};

const productImageUrlGenerator = (fileName) => {
  return `${config.S3CoverImageUrlPrefix}/${fileName}`;
};

const deleteVideoInS3Compressed = (videoUrl) => {
  const s3 = setS3Credentials;
  if (videoUrl) {
    // Delete the video file
    var deleteParams = {
      Bucket: config.S3CompressedVideoBucketName,
      Key: getFileBaseName(videoUrl),
    };
    s3.deleteObject(deleteParams, (err, data) => {
      // Check error
      if (err) {
        return err;
      }
    });
  }
};

const deleteImageInS3ProductImage = (imageUrl) => {
  const s3 = setS3Credentials;
  if (imageUrl) {
    // Delete the video file
    var deleteParams = {
      Bucket: config.S3CoverImageBucketName,
      Key: getFileBaseName(imageUrl),
    };
    s3.deleteObject(deleteParams, (err, data) => {
      // Check error
      if (err) {
        return err;
      }
    });
  }
};

module.exports = {
  setS3Credentials,
  s3ProfilePhotoParams,
  s3CustomerCoverImageParams,
  s3CustomerVideoParams,
  videoUrlGenerator,
  profilePhotoUrlGenerator,
  productImageUrlGenerator,
  deleteVideoInS3Compressed,
  deleteImageInS3ProductImage,
};
