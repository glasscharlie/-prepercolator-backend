const express = require('express');
const tokenAuth = require('../../middleware/tokenAuth');
const router = express.Router();
const db = require('../../models');


router.get("/", tokenAuth, (req,res)=>{
    db.Drink.findAll({include:[db.Ingredient]}).then(drinks=>{
       if(req.user.is_admin) {
       res.json(drinks);
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
    db.Drink.create(req.body).then(drink=>{
        for (let i = 0; i < req.body.ingredients.length; i++) {
            drink.addIngredient(req.body.ingredients[i], { through: { amount:req.body.ingredient_amount[i]} } )               
        }
        res.json(drink);
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.get("/user",tokenAuth, (req,res)=>{
    db.Drink.findAll({
        where: {
            userId:req.user.id
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
    db.Drink.findByPk(req.params.id, {include:[db.Ingredient]})
    .then(db.Drink.update(req.body, {
        where:{id:req.params.id}
        }))
        .then( drink => {
            console.log(drink)
            for (let i = 0; i < drink.ingredients.length; i++) {
                drink.removeIngredient(drink.ingredients[i])
            }
            for (let i = 0; i < req.body.ingredients.length; i++) {
                drink.addIngredient(req.body.ingredients, {through: {amount: req.body.ingredient_amount[i]}})
            }

            res.send('drink updated')
            }).catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
            }) 



module.exports = router;