require('dotenv').config()
const { CreateBucketCommand } = require("@aws-sdk/client-s3");
const s3Client = require("./lib/s3Client");

const bucketParams = {Bucket: process.env.BUCKET_NAME};

const run = async() =>{
    try {
        const data = await s3Client.send(new CreateBucketCommand(bucketParams));
        console.log("Success", data);
        return data;
        
    }
    catch(err){
        console.error(err);
    }
}

run()
