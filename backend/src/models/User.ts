import { Model } from "mongoose";
import { IUser } from "../interfaces/IUser";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nickname: String,
  email: String,
  password: String,
});

const UserModel: IUser = mongoose.model("User", UserSchema);

module.exports = { UserModel };
export { }