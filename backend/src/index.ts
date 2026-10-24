import express from "express"
const app = express()
app.use(express.json())

import cors from "cors";
app.use(cors());

import userRouter from "./routes/user";
import accountRouter from "./routes/account";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/account", accountRouter)

app.listen(3000);
