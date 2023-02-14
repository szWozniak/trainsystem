const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const sql = require('../db.js');

router.post("/login", async (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.send({ status: "BAD_REQUEST", err: "MISSING_INFORMATION" })
    }

    let user = await getByEmail(req.body.email);
    if(user == null) return res.send({ status: "err", err: "INVALID_LOGIN" })

    let token;
    try {
        token = jwt.sign(
            { id: user.id },
            process.env.SECRET,
            { expiresIn: "24h" })
    } catch(err) {
        return res.send({ status: "err", err: "INTERNAL_ERROR" })
    }

    bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if(isValid) {
            return res.send({ status: "OK", token: token })
        } else {
            return res.send({ status: "err", err: "INVALID_LOGIN" })
        }
    })
})

router.post("/register", (req, res) => {
    if(!req.body.email || !req.body.password || !req.body.passwordrepeat || !req.body.nickname) {
        return res.send({ status: "err", err: "MISSING_INFORMATION" })
    }

    if(req.body.password != req.body.passwordrepeat) {
        return res.send({ status: "err", err: "PASSWORDS_DONT_MATCH" })
    }

    let {nickname, email, password, ...body} = req.body;

    bcrypt.genSalt(10).then((salt) => {
        return bcrypt.hash(req.body.password, salt)
    }).then(async (hash) => {
        let exists = await checkIfExists(nickname, email)
        if(exists) {
            return res.send({ status: "err", err: "USER_EXISTS" })
        }

        let created = await createUser(nickname, email, hash)
        if(created) return res.send({ status: "OK" })
        else return res.send({ status: "err", err: "INTERNAL_ERROR" })
    }).catch((err) => {
        return res.send({ status: "SERVER_ERROR", err: "ENCRYPTION_ERROR" })
    })
})

let checkIfExists = (nickname, email) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM users WHERE nickname = '${nickname}' OR email = '${email}'`, (err, res) => {
            if(err) return resolve(true)
            if(res.length > 0) return resolve(true)
            return resolve(false)
        })
    })
}

let getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
            if(err || res.length == 0) return resolve(null)
            return resolve(res[0])
        })
    })
}

let createUser = (nickname, email, hash) => {
    return new Promise((resolve, reject) => {
        sql.query(`INSERT INTO users (nickname, email, password) VALUES ('${nickname}', '${email}', '${hash}')`, (err, res) => {
            if(err) return resolve(false)
            return resolve(true)
        }).catch((err) => {
            return resolve(false)
        })
    })
}

module.exports = router