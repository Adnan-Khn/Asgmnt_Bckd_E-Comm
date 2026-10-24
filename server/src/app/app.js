import express from "express";
import cookieParser from "cookie-parser"
import AuthRoutes from "../routes/auth.route.js"
import ProductRoutes from "../routes/product.route.js"
import cors from "cors";
import { config } from "../config/config.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  config.CLIENT_URL,
];

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))

app.get("/",(req,res)=>{
    res.send("Backend is running")
})

app.use("/api/auth",AuthRoutes)
app.use("/api/products",ProductRoutes)
export default app