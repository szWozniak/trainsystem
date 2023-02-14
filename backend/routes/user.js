const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const sql = require('../db.js');

router.get("/profile", (req, res) => {
    if(!req.headers.authorization) return res.send({ status: "err", err: "UNAUTHORIZED"})
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
        if(err || !decoded.id) return res.send({ status: "err", err: "UNAUTHORIZED"})
        let users = await getUserById(decoded.id)
        if(users.length != 1) return res.send({ status: "err", err: "UNAUTHORIZED"})
        return res.send({ status: "OK", user: { email: users[0].email, id: users[0].id, nickname: users[0].nickname }})
    });
    
})

let getUserById = (id) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
            resolve(res)
        })
    })
}

module.exports = router