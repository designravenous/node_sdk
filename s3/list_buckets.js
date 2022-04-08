const { ListBucketsCommand,GetBucketAclCommand } =require("@aws-sdk/client-s3");
const s3Client = require("./lib/s3Client");

var bucket_array = [];
const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    data.Buckets.map(item => {
        s3Client.send(new GetBucketAclCommand({Bucket: item.Name}))
            .then(acl => {
                let bucket_data = {
                    Bucket: `${item.Name}`,
                    permissions: `${acl.Grants[0].Permission}`,
                    specification: acl.Grants[0].Grantee
                };
                bucket_array.push(bucket_data);
                
            })
            .catch(err => console.log(`unable to find ACL for ${item.Name}`))
    }); 
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();
setTimeout(() =>{
    let data = {
      "results": bucket_array,
      "count": bucket_array.length
    }
    console.log(data);
}, 3000)
