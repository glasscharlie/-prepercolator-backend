const express = require('express');
const router = express.Router();
const db = require('../../models');


router.get("/",(req,res)=>{
    db.Drink.findAll({include:[db.Ingredient]}).then(drinks=>{
       res.json(drinks);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
});

router.post("/",(req,res)=>{
    db.Drink.create(req.body).then(drink=>{
        req.session.drink = {
            id:drink.id,
            name:drink.name,
            is_vegan:drink.is_vegan,
            is_steamed:drink.is_steamed,
            unit_amount:drink.unit_amount
        }
        res.json(drink);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.get("/:id",(req,res)=>{
    db.Drink.findAll({
        where: {
            food:req.params.id
        },
        include:[db.Ingredient]
    }).then(Drink=>{
        res.json(Drink);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;