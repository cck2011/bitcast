import dotenv from "dotenv";
dotenv.config();

export const env = {
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || "5432",
    PORT: +process.env.PORT! || 8080,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    LOGGING_LEVEL: process.env.LOGGING_LEVEL || "silly",
    NODE_ENV: process.env.NODE_ENV || "development",
    TESTDB_NAME: process.env.TESTDB_NAME,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID || "",
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET || "",
    TWITTER_ACCESS_ID: process.env.TWITTER_ACCESS_ID || "",
    TWITTER_ACCESS_SECRET: process.env.TWITTER_ACCESS_SECRET || "",
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "",
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "",
    PUBLIC_KEY: process.env.PUBLIC_KEY || "",
    PRIVATE_KEY: process.env.PRIVATE_KEY || "",
    TOKEN: process.env.TOKEN || "",
};
