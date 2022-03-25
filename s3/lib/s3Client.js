require('dotenv').config()
const { S3Client } = require("@aws-sdk/client-s3");
const REGION=process.env.region;

const s3Client = new S3Client({ region: process.env.REGION });

module.exports = s3Client;
