const express = require('express');
const bodyParser = require('body-parser')
const dishRouter_dish = express.Router()

dishRouter_dish.use(bodyParser.json());

dishRouter_dish.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain');
    next();
})
// For particular dish
.get((req,res,next)=>{ 
    res.end('Will send the  dishes with Id : ' + req.params.dishId + ' to you')
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.end('This operation is not supported on /dishes/'+ req.params.dishId)
})

.put((req,res,next) =>{
    res.write('Updating the dish : '+ req.params.dishId);
    res.end('Will update the dish : '+ req.body.name + 'with details' + req.body.descripton)

})

.delete((req,res,next) =>{
    res.end('Deleting  dish : '+ req.params.dishId);
})


module.exports = dishRouter_dish;