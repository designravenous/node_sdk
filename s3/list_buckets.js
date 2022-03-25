const { ListBucketsCommand,GetBucketAclCommand } =require("@aws-sdk/client-s3");
const s3Client = require("./lib/s3Client");

var bucket_array = [];
const run = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    data.Buckets.map(item => {
        s3Client.send(new GetBucketAclCommand({Bucket: item.Name}))
            .then(acl => {
                //console.log(`${item.Name}: ${acl.Grants[0].Permission} for more details look below:`);
                //console.log(acl.Grants[0].Grantee);
                let bucket_data = {
                    Bucket: `${item.Name}`,
                    permissions: `${acl.Grants[0].Permission}`,
                    specification: acl.Grants[0].Grantee
                };
                bucket_array.push(bucket_data);
                
            })
            .catch(err => console.log(`unable to find ACL for ${item.Name}`))
    }); 
    //console.log(data.Buckets.length)
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run();
setTimeout(() =>{
    console.log(bucket_array)
    console.log(bucket_array.length)
}, 3000)
