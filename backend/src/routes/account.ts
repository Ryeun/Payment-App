import { Router } from "express";
import userMiddleware from "../middleware";
import { accountModel } from "../db";
import mongoose from "mongoose";
const accountRouter = Router();

accountRouter.get("/balance", userMiddleware, async (req,res) => {
    const account = await accountModel.findOne({
        userId: req.userId
    })
    res.json({
        balance: account?.balance
    })
})

accountRouter.post("/transfer", userMiddleware, async (req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body;
    const account = await accountModel.findOne({userId: req.userId}).session(session)
    if (!account || account.balance < amount){
        await session.abortTransaction();
        res.status(400).json({message: "Insuficient balance"})
        return
    }
    const toAccount = await accountModel.findOne({userId: to}).session(session)
    if (!toAccount){
        await session.abortTransaction();
        res.status(400).json({message: "Invalid Account"})
        return
    }
    await accountModel.findOneAndUpdate( 
        { userId: req.userId},
        { $inc: { balance: -amount } },
        { session }
    )
    await accountModel.findOneAndUpdate(
        { userId: to },
        { $inc: { balance: amount } },
        { session }
    )

    await session.commitTransaction();
    res.json({message: "Transfer Successful"})
})

export default accountRouter;
