const router = require('express').Router();
const { Type } = require('../../models');
const tokenAuth = require("../../middleware/tokenAuth");

// Get all types
router.get('/', async (req, res) => {
    try {
        const typeData = await Type.findAll({});
        res.status(200).json(typeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Get single type by ID
router.get('/:id', async (req, res) => {
    try {
        const singleTypeData = await Type.findByPk(req.params.id);
        if(!singleTypeData) {
            res.status(404).json({ message: 'No Type found with that id ):' });
            return;
        };
        res.status(200).json(singleTypeData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Update Type by ID
router.put('/:id', async (req, res) => {
    if(req.user.is_admin) {
    try {
        // Requires full type data in body
        const updateTypeData = await Type.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if(!updateTypeData) {
            res.status(404).json({ message: 'No Type found with that id ):' });
            return;
        };
        res.status(200).json(updateTypeData);
    } catch (err) {
        res.status(500).json(err);
    };
}
else{
    res.status(403).json({message:"Auth failed"})
}
});

// Create new Type
router.post('/', async (req, res) => {
    if(req.user.is_admin) {
    try {
        const newTypeData = await Type.create(req.body);
        res.status(200).json(newTypeData);
    } catch (err) {
        res.status(500).json(err);
    };
}
else{
    res.status(403).json({message:"Auth failed"})
}
});

// Delete type by ID
router.delete('/:id', async (req, res) => {
    if(req.user.is_admin) {
    try {
      const delTypeData = await Type.destroy({
          where: {
              id: req.params.id,
          },
      });
      if(!delTypeData) {
          res.status(404).json({ message: 'No Type found with that id ):' });
      };
      res.status(200).json(delTypeData); 
    } catch (err) {
        res.status(500).json(err);
    };
}
else{
    res.status(403).json({message:"Auth failed"})
}
});



module.exports = router;