const express = require('express');
const bodyParser = require('body-parser')
const promoRouter = express.Router()
const Promotions = require('../models/promotion');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promotions)=>{
          res.statusCode = 200
          res.setHeader('Content-Type','Application/json')
          res.json(promotions)
    }, (err)=>{
        next(err)
    })
    .catch((err)=> next(err))
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    Promotions.create(req.body)
    .then((promotion) => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotion');
})

.delete((req,res,next) =>{
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


// For particular promotion
promoRouter.route('/:promoId')
.get((req,res,next)=>{ 
    Promotions.findById(req.params.promoId)
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.statusCode = 403
    res.end('This operation is not supported on /promotions/'+ req.params.promoId)
})

.put((req,res,next) =>{
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));

})

.delete((req,res,next) =>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

module.exports = promoRouter;