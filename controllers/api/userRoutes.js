const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../../models');
const path = require('path');
const jwt = require("jsonwebtoken")
const tokenAuth = require("../../middleware/tokenAuth")

//Get all Users
router.get("/", tokenAuth, (req,res)=>{
    db.User.findAll({
        include:[{model:db.Drink,
        include:[db.Ingredient]}]
    }).then(users=>{
        if(req.user.is_admin) {
            res.json(users);
        }
        else {
            res.status(403).json({message:"Auth failed"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

//Create new User
router.post("/",(req,res)=>{
    db.User.create(req.body).then(user=>{
        const token = jwt.sign({
            username:user.username,
            email:user.email,
            id:user.id,
            is_admin:user.is_admin
        },process.env.JWT_SECRET, {
            expiresIn:"2h"
        })
        res.json({token, user});
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

//get User information by logged in User ID
router.get("/user",tokenAuth,(req,res)=>{
    db.User.findByPk(req.user.id,{
        include:[{model:db.Drink,
        include:[db.Ingredient]}]
    }).then(users=>{
        res.json(users);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

//login with username and pass
router.post("/login",(req,res)=>{
    db.User.findOne({
        where:{
            username:req.body.username
        }
    }).then(user=>{
        if(!user){
            res.status(403).json({
                message:"incorrect username or password, please try again"
            })
        }else {
            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password);
            if(isPasswordCorrect){
                const token = jwt.sign({
                    username:user.username,
                    email:user.email,
                    id:user.id,
                    is_admin:user.is_admin
                },process.env.JWT_SECRET, {
                    expiresIn:"2h"
                })
                res.json({token, user});
            } else {
                res.status(403).json({
                    message:"incorrect username or password, please try again"
                })
            }
        }
    })
})

//update User
router.put('/update', tokenAuth, (req,res)=>{
    db.User.update(req.body, {
        where:{id:req.user.id},
        individualHooks: true,
    }).then(drink => {
            res.json(drink)
        }).catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
})
            

//delete User with logged in User ID
router.delete("/delete",tokenAuth,(req,res)=>{
    db.User.destroy({
        where:{
            id:req.user.id
        }
    }).then(user=>{
        res.json(user);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})


module.exports = router;


