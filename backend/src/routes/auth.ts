import { Request, Response } from "express";
import { Document, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const sql = require('../db.js');
const { UserModel } = require("../models/User");

router.post("/login", async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password) {
        return res.send({ status: "BAD_REQUEST", err: "MISSING_INFORMATION" })
    }

    let user: IUser = await getByEmail<IUser>((req.body.email as string));
    if(user == null) return res.send({ status: "err", err: "INVALID_LOGIN" })

    let token: string;
    try {
        token = jwt.sign(
            { _id: user._id },
            process.env.SECRET,
            { expiresIn: "24h" })
    } catch(err) {
        return res.send({ status: "err", err: "INTERNAL_ERROR" })
    }

    bcrypt.compare(req.body.password, user.password, (err: Error, isValid: boolean) => {
        if(isValid) {
            return res.send({ status: "OK", token: token })
        } else {
            return res.send({ status: "err", err: "INVALID_LOGIN" })
        }
    })
})

router.post("/register", (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password || !req.body.passwordrepeat || !req.body.nickname) {
        return res.send({ status: "err", err: "MISSING_INFORMATION" })
    }

    if(req.body.password != req.body.passwordrepeat) {
        return res.send({ status: "err", err: "PASSWORDS_DONT_MATCH" })
    }

    let {nickname, email, password, ...body} = req.body;

    bcrypt.genSalt(10).then((salt: string) => {
        return bcrypt.hash((req.body.password as string), salt)
    }).then(async (hash: string) => {
        let exists: boolean = await checkIfExists(nickname, email)
        if(exists) {
            return res.send({ status: "err", err: "USER_EXISTS" })
        }

        let created: boolean = await createUser(nickname, email, hash)
        if(created) return res.send({ status: "OK" })
        else return res.send({ status: "err", err: "INTERNAL_ERROR" })
    }).catch((err) => {
        return res.send({ status: "SERVER_ERROR", err: "ENCRYPTION_ERROR" })
    })
})

let checkIfExists = (nickname: string, email: string): Promise<boolean> => {
    return new Promise((resolve, reject): void => {
        UserModel.findOne({$or: [
            { nickname: nickname }, { email: email }
        ]}).then((obj) => {
            if(obj && obj != null) resolve(true)
            resolve(false)
        }).catch((err) => resolve(false))
    })
}

let getByEmail = <Type>(email: string): Promise<Type> => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({email: email})
            .then((obj) => resolve(obj))
            .catch((err) => resolve(null))
    })
}

let createUser = (nickname: string, email: string, hash: string): Promise<boolean> => {
    const newUser: Document = new UserModel({
        nickname: nickname, 
        email: email, 
        password: hash
    });

    return new Promise((resolve, reject) => {
        newUser.save()
            .then(() => { resolve(true)})
            .catch((err) => { resolve(false)})
    })
}

module.exports = router
export { }