const express = require('express');
const tokenAuth = require('../../middleware/tokenAuth');
const router = express.Router();
const db = require('../../models');


router.get("/", tokenAuth, (req,res)=>{
    db.Order.findAll({
        include:[{model:db.Drink,
        include:[db.Ingredient]}]
    }).then(orders=>{
        if(req.user.is_admin) {
            res.json(orders);
            }
            else {
             res.status(403).json({message:"Auth failed"})
            }
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.post("/",(req,res)=>{
    db.Order.create(req.body).then(order=>{
        console.log(req.body.order)
        for (let i = 0; i < req.body.drinks.length; i++) {
            order.addDrink(req.body.drinks[i])               
        }
        res.json(order);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})


router.get("/user", tokenAuth,(req,res)=>{
    console.log(req.user)
    db.Order.findAll({
        where: {
            userId:req.user.id
        },
        include:[{model:db.Drink,
            include:[db.Ingredient]}]
        
    }).then(order=>{
        res.json(order);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})


router.delete("/id", (req,res)=>{
    db.Order.destroy({
        where:{
            id:req.params.id,
           }
       }).then(delOrder=>{
           if(delOrder){
               res.json({
                   message:"succesful delete!"
               });
            } else {
                res.status(400).json({message:"Drink with that ID doesnt exist"})
            }
       }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})




module.exports = router;