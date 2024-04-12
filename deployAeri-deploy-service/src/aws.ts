import { S3 } from "aws-sdk";
import config from "./config"
import fs from "fs"
import path from "path"

const s3 = new S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    endpoint: config.AWS_ENDPOINT
})

export async function downloadProjectFromObjectStore(remotePath: string){
    const allFiles = await s3.listObjectsV2({
        Bucket: config.REDIS_BUCKET_NAME,
        Prefix: remotePath
    }).promise();

    const allPromises = allFiles.Contents?.map(async({Key}) =>{
        return new Promise(async (resolve) =>{
            if(!Key){
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname, Key);
            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            if(!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, { recursive: true});
            }
            s3.getObject({
                Bucket: config.REDIS_BUCKET_NAME,
                Key
            }).createReadStream().pipe(outputFile).on("end", () => {
                resolve("");
            })
        })
    }) || []
    console.log("Waiting");

    await Promise.all(allPromises?.filter(x => x !== undefined));
}