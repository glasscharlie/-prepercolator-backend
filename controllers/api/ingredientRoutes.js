const router = require('express').Router();
const { Ingredient, Type } = require('../../models');
const tokenAuth = require("../../middleware/tokenAuth")

// Get all Ingredients
router.get('/', async (req, res) => {
    try {
        const ingredientData = await Ingredient.findAll({
            include: [{ model: Type }],
        });
        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Get Ingredient by ID
router.get('/:id', async (req, res) => {
    try {
        const singleIngredientData = await Ingredient.findByPk(req.params.id, {
            include: [{ model: Type }],
        });
        if (!singleIngredientData) {
            res.status(404).json({ message: 'No Ingredient found with that id ):' });
            return;
        };
        res.status(200).json(singleIngredientData);
    } catch (err) {
        res.status(500).json(err);
    };
});

//get Ingredient by Type
router.get("/type/:id",(req,res)=>{
    Ingredient.findAll({
        where: {
            typeId: req.params.id
        },
        include:[Type]
    }).then(ingredient=>{
        res.json(ingredient);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

//get Ingredient by Tier
router.get("/tier/:tier",(req,res)=>{
    Ingredient.findAll({
        where: {
            tier: req.params.tier
        },
        include:[Type]
    }).then(ingredient=>{
        res.json(ingredient);
    }).catch(err=>{
        res.status(500).json(err);
    })
})

// Update an Ingredient
router.put('/:id',tokenAuth, async (req, res) => {
    if(req.user.is_admin) {
    try {
        const ingredientUpdateData = await Ingredient.update(req.body, {
            where: {
                id: req.params.id,
            },
            individualHooks: true,
        });
        if (!ingredientUpdateData[0]) {
            res.status(404).json({ message: 'No Ingredient found with that id ):' });
            return;
        };
        res.status(200).json(ingredientUpdateData);
    } catch (err) {
        res.status(500).json(err);
    };
}
else{
    res.status(403).json({message:"Auth failed"})
}
});

// Create new Ingredient
router.post('/', tokenAuth, async (req, res) => {
    if(req.user.is_admin) {
    try {
        const newIngredientData = await Ingredient.create(req.body)
        res.status(200).json(newIngredientData);
    } catch (err) {
        res.status(500).json(err);
    };
}
else{
    res.status(403).json({message:"Auth failed"})
}
});

// Delete Ingredient by ID
router.delete('/:id', tokenAuth, async (req, res) => {
    if(req.user.is_admin) {
    try {
        const ingredientDelData = await Ingredient.destroy({
            where: {
                id: req.params.id
            },
        });
        if (!ingredientDelData) {
            res.status(404).json({ message: 'No Ingredient found with that id ):' })
            return;
        };
        res.status(200).json(ingredientDelData);
    }
 catch (err) {
    res.status(500).json(err);
    };
}
else{
    res.status(403).json({message:"Auth failed"})
}
});



module.exports = router;