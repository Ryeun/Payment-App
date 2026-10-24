import mongoose, { model, Schema } from "mongoose";
import "dotenv/config"

mongoose.connect(process.env.MONGO_URL!)

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
export const UserModel = model("User", UserSchema)

const accountSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    balance: {type: Number, required: true}
})
export const accountModel = model("Account", accountSchema)