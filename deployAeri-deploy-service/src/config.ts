interface Config
{
    AWS_ACCESS_KEY_ID: string;   
    AWS_SECRET_ACCESS_KEY: string;   
    AWS_ENDPOINT: string;
    REDIS_BUCKET_NAME: string;
}

const config: Config = {
    AWS_ACCESS_KEY_ID: "<your_access_key>",
    AWS_SECRET_ACCESS_KEY: "<your_acccess_key>",
    AWS_ENDPOINT: "<your_endpoint_name>",
    REDIS_BUCKET_NAME : "<your_bucket_name>"
}
export default config