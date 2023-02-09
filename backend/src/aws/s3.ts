import S3 from "aws-sdk/clients/s3";
import sharp from "sharp";
import env from "../utils/validateEnv"

const region = env.AWS_REGION;
const accessKeyId = env.AWS_ACCESS_KEY_ID;
const secretAccessKey = env.AWS_SECRET_KEY;

const s3 = new S3({
    region, 
    accessKeyId,
    secretAccessKey
});


// upload a file to s3
export async function uploadFile(file: Express.Multer.File, bucketName: string) {
    // resizing the image before uploading to s3
    const productImg = await sharp(file.path)
        .resize({width: 400, height: 400, fit: 'inside'})
        .toBuffer();

    const uploadParams = {
        Bucket: bucketName,
        Body: productImg,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}

// downloading an image from s3
export async function getImage(filekey: string, bucketName: string){
    const params = {
        Key: filekey,
        Bucket: bucketName
    }

    return s3.getObject(params).createReadStream();
}

// deleting an image from s3
export async function deleteImage(filekey: string, bucketName: string) {
    const params = {
        Key: filekey,
        Bucket: bucketName
    }
    return s3.deleteObject(params).promise()
}