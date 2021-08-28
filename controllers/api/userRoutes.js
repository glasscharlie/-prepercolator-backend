const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../../models');
const path = require('path');

router.get("/",(req,res)=>{
    db.User.findAll({
        include:[db.Drink]
    }).then(users=>{
       res.json(users);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});