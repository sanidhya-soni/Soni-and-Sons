const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require('stream');
const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');

const s3Client = new S3Client({
  region: 'ap-south-1', // Replace 'YOUR_REGION' with your desired AWS region
  maxAttempts: 3, // Number of retry attempts
  requestTimeout: 600000, // Request timeout in milliseconds (e.g., 10 minutes)
});

const uploadFileToS3 = async (bucketName, filePath, keyName) => {
  const fileStream = fs.createReadStream(filePath);
  let totalBytes = 0;
  let uploadedBytes = 0;

  const uploadParams = {
    Bucket: bucketName,
    Key: keyName,
    Body: fileStream
  };

  const command = new PutObjectCommand(uploadParams);

  fileStream.on('open', () => {
    const stats = fs.statSync(filePath);
    totalBytes = stats.size;
    console.log('File size:', totalBytes);
  });

  const upload = new Upload({
    client: s3Client,
    tags: { Key: keyName },
    leavePartsOnError: false,
    params: uploadParams,
  });

  upload.on('httpUploadProgress', (progress) => {
    uploadedBytes = progress.loaded;
    const percentProgress = Math.round((uploadedBytes / totalBytes) * 100);
    console.log(`Uploading... Progress: ${percentProgress}%`);
  });

  try {
    await upload.done();
    console.log('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

// Example usage
const bucketName = 'sns-video'; // Replace 'YOUR_BUCKET_NAME' with your S3 bucket name
const filePath = 'E:/Kapil.mkv'; // Replace 'PATH_TO_YOUR_FILE' with the actual file path on your system
const keyName = 'new/Kapil.mkv'; // Replace 'KEY_NAME_IN_S3' with the desired key name in the S3 bucket

uploadFileToS3(bucketName, filePath, keyName);
