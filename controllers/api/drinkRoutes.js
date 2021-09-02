const express = require('express');
const tokenAuth = require('../../middleware/tokenAuth');
const router = express.Router();
const db = require('../../models');

//Get all Drinks
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

//Create new Drink
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

//get Drink by logged in users ID
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

//delete drink by ID
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

//Update drink by ID
router.put('/:id', (req,res)=>{
    db.Drink.findByPk(req.params.id, {include:[db.Ingredient]})
    .then(db.Drink.update(req.body, {
        where:{id:req.params.id}
        }))
        .then(async drink => {
            await drink.setIngredients([])
            for (let i = 0; i < req.body.ingredients.length; i++) {
                drink.addIngredient(req.body.ingredients[i], {through: {amount: req.body.ingredient_amount[i]}})
                .catch(err=>{
                    console.log(err)
                })
            }
            res.send('drink updated')
            }).catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
            }) 


module.exports = router;