const express = require('express');
const redisClient = require('../connection/redis');
const Model = require('../models/model');

const router = express.Router();

// const redisClient = redis();

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});


//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const _id = req.params.id;
        const data = await Model.findOne({_id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

//Redis get by ID  Method
router.get('/getOneRedis/:id', async (req, res) => {
    try{
        const id = req.params.id;

        const data = await redisClient.hGetAll(`id:${id}`);
        
        const user = JSON.parse(JSON.stringify(data));
        
        const hasCacheData = Object.keys(user).length != 0;
        
        if (!hasCacheData) {
            const user = await Model.findById(req.params.id);
            if(user){
                redisClient.hSet(`id:${id}`, JSON.parse(JSON.stringify(user)));
                return res.status(200).send(user);
            }else{
                return res.status(404);
            }
          } else {
            return res.status(200).send(user);
          }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


//Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;