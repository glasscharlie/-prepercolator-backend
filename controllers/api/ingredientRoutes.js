const router = require('express').Router();
const { Ingredient, Type } = require('../../models');

// Get All Ingredients
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

// Get Ingredient by id
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

//get Ingredient by type
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

//get ingredient by tier
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
router.put('/:id', async (req, res) => {
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
        console.log(typeof ingredientUpdateData[1])
        res.status(200).json(ingredientUpdateData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Create new Ingredient
router.post('/', async (req, res) => {
    try {
        // Requires full ingredient data to be passed in req.body
        const newIngredientData = await Ingredient.create(req.body)
        res.status(200).json(newIngredientData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Delete ingredient by id
router.delete('/:id', async (req, res) => {
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
    } catch (err) {
        res.status(500).json(err);
    };
});



module.exports = router;