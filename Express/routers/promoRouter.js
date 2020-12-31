const express = require('express');
const bodyParser = require('body-parser')
const promoRouter = express.Router()

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain');
    next();
})

// next() will execute the next command(get, post, put etc) after the execution of the the 1st 2 lines.
.get((req,res,next)=>{
    res.end('Will send the all promotions to you')
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.end('Will add the promotion :'+ req.body.name + ' with details :'+ req.body.descripton)
})

.put((req,res,next) =>{
    res.end('This operation is not supported on /promotions ')
})

.delete((req,res,next) =>{
    res.end('Deleting all existing promotions! ')
});


// For particular dish
promoRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{ 
    res.end('Will send the  promotion with Id : ' + req.params.promoId + ' to you')
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.end('This operation is not supported on /promotions/'+ req.params.promoId)
})

.put((req,res,next) =>{
    res.write('Updating the promotion : '+ req.params.promoId);
    res.end('Will update the promotion : '+ req.body.name + 'with details' + req.body.descripton)

})

.delete((req,res,next) =>{
    res.end('Deleting  promotion : '+ req.params.promoId);
})


module.exports = promoRouter;