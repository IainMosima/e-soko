import S3 from "aws-sdk/clients/s3";
import * as fs from 'fs-extra';
import env from "../utils/validateEnv"

const bucketName = env.AWS_BUCKET_NAME;
const region = env.AWS_REGION;
const accessKeyId = env.AWS_ACCESS_KEY_ID;
const secretAccessKey = env.AWS_SECRET_KEY;

const s3 = new S3({
    region, 
    accessKeyId,
    secretAccessKey
});


// upload a file to s3
export async function uploadFile(file: Express.Multer.File) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}

// downloading an image from s3
export async function getFileStream(filekey: string) {
    const downParams = {
        Key: filekey,
        Bucket: bucketName
    }

    return s3.getObject(downParams).createReadStream();
}