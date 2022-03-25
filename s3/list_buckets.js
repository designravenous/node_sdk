const { ListBucketsCommand } =require("@aws-sdk/client-s3");
const s3Client = require("./lib/s3Client");

const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("Success", data.Buckets);
    data.Buckets.map(item => console.log(item.Name)); 
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();
