import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const sql = require('../db.js');
const { UserModel } = require("../models/User");

router.get("/profile", (req: Request, res: Response) => {
    if(!req.headers.authorization) return res.send({ status: "err", err: "UNAUTHORIZED"})
    let token: string = (req.headers.authorization as string).split(" ")[1];
    
    jwt.verify(token, process.env.SECRET, async (err: Error, decoded: IUser) => {
        if(err || !decoded._id) return res.send({ status: "err", err: "UNAUTHORIZED"})
        let user: IUser = await getUserById<IUser>(decoded._id)
        if(!user) return res.send({ status: "err", err: "UNAUTHORIZED"})
        return res.send({ status: "OK", user: { email: user.email, id: user._id, nickname: user.nickname }})
    });
    
})

let getUserById = <Type>(id: string): Promise<Type> => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({_id: id})
            .then((obj) => resolve(obj))
            .catch((err) => resolve(null))
    })
}

module.exports = router
export { }