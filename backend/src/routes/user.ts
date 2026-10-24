import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { accountModel, UserModel } from "../db";
import "dotenv/config";

import { Router } from "express";
import userMiddleware from "../middleware";
const userRouter = Router();

const requiredBody = z.object({
        firstname: z.string().min(2).max(20),
        lastname: z.string().min(2).max(20),
        username: z.string().email(),
        password: z.string().min(6).max(20)
    })
userRouter.post("/signup", async (req,res) => {
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if(!parsedDataWithSuccess.success){
        res.json({message: "Incorrect Format"})
        return
    }
    const {firstname, lastname, username, password} = parsedDataWithSuccess.data;
    const hashedPass = await bcrypt.hash(password,5)
    const user = await UserModel.create({
        firstname,
        lastname,
        username,
        password: hashedPass
    })
    const userId = user._id;
    await accountModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    res.json({message: "user signed up"})
})

userRouter.post("/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({username})
    if(!existingUser){
        res.status(403).json({message: "not exist"})
        return
    }
    const matchedPass = await bcrypt.compare(password, existingUser.password)   
    if (matchedPass) {
        const token = jwt.sign({
            id: existingUser?._id.toString()},
            process.env.JWT_PASS!)
        res.json({token: token})
    }
    else {
        res.status(403).json({message: "Unauthorized"})
    }
})

const updatedBody = z.object({
        firstname: z.string().min(2).max(20).optional(),
        lastname: z.string().min(2).max(20).optional(),
        username: z.string().min(2).max(20).optional(),
        password: z.string().min(6).max(20).optional()
    })
userRouter.put("/update", userMiddleware, async (req,res) => {
    const {success, data} = updatedBody.safeParse(req.body);
    if(!success){
        res.status(411).json({message: "Incorrect Format"})
        return
    }
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 5);
    }
    await UserModel.updateOne(
        { _id: req.userId },
        { $set: data }
    )
    res.json({message: "user updated"})
})

userRouter.get("/bulk", async (req,res) => {
    const filter = String(req.query.filter || "");
    const users = await UserModel.find({
        $or: [{
            firstname: {
            $regex: filter,
            $options: "i"
        }
        },{
            lastname: {
            $regex: filter,
            $options: "i"
        }
        }]
        
    })
    res.json({
        user: users.map( user => ({
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            _id: user._id
        }))
    })
})

export default userRouter;
