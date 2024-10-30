declare namespace NodeJS{
    interface ProcessEnv{
        EMAIL:string;
        PASSWORD:string;
        MONGO_DB_STRING:string;
        DOMAIN:string;
        JWT_SECRET:string;
    }
}