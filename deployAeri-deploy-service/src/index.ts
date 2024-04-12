import {createClient, commandOptions } from "redis";
import { downloadProjectFromObjectStore } from "./aws";
import config from "./config"

// dotenv.config(
const subscriber = createClient();
//subscriber.connect(); // redis default runs on localhost:6379

async function main(){
    try{
        await subscriber.connect();
        while(true){
            const response = await subscriber.brPop(
                commandOptions({isolated: true}),
                config.REDIS_BUCKET_NAME,
                0
            );
            console.log(response);
            //@ts-ignore;
            const id = response.element;
            await downloadProjectFromObjectStore(`/output/${id}`)
        }
    } catch(error){
        console.log('Error in main loop:', error); 
    }
}
main();