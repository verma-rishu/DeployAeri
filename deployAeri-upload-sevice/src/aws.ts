import fs from "fs"
import path from "path"
import { S3 } from "aws-sdk"

const s3 = new S3({
    accessKeyId: "<your_acccess_key>",
    secretAccessKey: "<your_secret_key>",
    endpoint: "<your_endpoint>"
})

export const uploadFile = async (fileName: string, localFilePath: string) =>{
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel-clone",
        Key: fileName,
    }).promise();

}