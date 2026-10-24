import dotenv from "dotenv"

dotenv.config()

export const config = {
    MONGODB_URI : process.env.MONGODB_URI,
    PORT:process.env.PORT,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_SECRET,
    IMAGEKIT_SECRET : process.env.IMAGEKIT_SECRET,
    CLIENT_URL : process.env.CLIENT_URL
}