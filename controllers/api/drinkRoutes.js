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
        console.log(req.body.ingredients)
        for (let i = 0; i < req.body.ingredients.length; i++) {
            drink.addIngredient(req.body.ingredients[i], { through: { amount:req.body.ingredient_amount[i]} } )               
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
            id:req.params.id
        },
        include:[db.Ingredient]
    }).then(Drink=>{
        res.json(Drink);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete("/:id",(req,res)=>{
    db.Drink.destroy({
        where:{
            id:req.params.id,
           }
       }).then(delDrink=>{
           if(delDrink){
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

router.put('/:id', (req,res)=>{
    db.Drink.update(req.body, {
        where:{
            id:req.params.id,
           }
        }).then (db.drinkIngredients.update(req.body, {
            where:{
                id:req.params.id,
               }
            }))
        .then(drink => {
                console.log(drink)
                res.send(drink)
            }).catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
            }) 


module.exports = router;