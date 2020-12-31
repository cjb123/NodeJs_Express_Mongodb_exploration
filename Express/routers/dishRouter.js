const express = require('express');
const bodyParser = require('body-parser')
const dishRouter = express.Router()

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain');
    next();
})

// next() will execute the next command(get, post, put etc) after the execution of the the 1st 2 lines.
.get((req,res,next)=>{
    res.end('Will send all dishes to you')
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.end('Will add the dish :'+ req.body.name + ' with details :'+ req.body.descripton)
})

.put((req,res,next) =>{
    res.end('This operation is not supported on /dishes ')
})

.delete((req,res,next) =>{
    res.end('Deleting all dishes! ')
});


// For particular dish
dishRouter.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain');
    next();
})

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


module.exports = dishRouter;