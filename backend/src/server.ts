import { Request, Response, Router } from "express";

const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const router: Router = express.Router()

let app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();

mongoose.set('strictQuery', false);
const mongoDB: string = "mongodb://127.0.0.1/users";

app.get("/", (req: Request, res: Response) => {
    res.send({ status: "OK" })
})

const authRoute: Router = require('./routes/auth')
app.use("/auth", authRoute)

const userRoute: Router = require('./routes/user')
app.use("/user", userRoute)

async function mongoConnect(): Promise<void> {
    await mongoose.connect(mongoDB);
}

app.listen(process.env.PORT, (): void => {
    mongoConnect().then(() => {
        console.log("Connected to MongoDB!");
    })
    
    console.log("Backend API listening on port " + process.env.PORT)
})