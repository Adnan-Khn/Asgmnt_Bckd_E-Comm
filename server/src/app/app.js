import express from "express";
import cookieParser from "cookie-parser"
import AuthRoutes from "../routes/auth.route.js"
import ProductRoutes from "../routes/product.route.js"
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"https://asgmnt-bckd-e-comm.onrender.com"
}))

app.get("/",(req,res)=>{
    res.send("Backend is running")
})

app.use("/api/auth",AuthRoutes)
app.use("/api/products",ProductRoutes)
export default app