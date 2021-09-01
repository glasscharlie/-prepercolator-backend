const express = require('express');
const router = express.Router();
const db = require('../../models');


router.get("/",(req,res)=>{
    db.Order.findAll({
        include:[{model:db.Drink,
        include:[db.Ingredient]}]
    }).then(orders=>{
       res.json(orders);
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

router.get("/:id",(req,res)=>{
    db.Order.findAll({
        where: {
            id:req.params.id
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

router.delete("/:id",(req,res)=>{
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

router.put('/:id', (req,res)=>{
    db.Order.findByPk(req.params.id, {include:[db.Drink]})
    .then(db.Order.update(req.body, {
        where:{id:req.params.id}
        }))
        .then( order => {
            order.setDrinks(req.body.drinks)
            res.send('drink updated')
            }).catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
            }) 



module.exports = router;