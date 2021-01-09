const express = require('express');
const bodyParser = require('body-parser')
const authenticate = require('../authenticate')
const multer = require('multer')

const storage = multer.diskStorage({
       destination: (req,file,callback)=>{
          callback(null , 'public/images')
       },
       filename: (req,file,callback) => {
           callback(null,file.originalname)  //otherwise multer will give a random string as image name.We take the same name as set by client
       }
})

const imageFileFilter = (req,file,callback)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return this.callback(new Error("Only image files are  supported!!", false))
    }
    callback(null, true)
}

const upload = multer({ storage: storage, fileFilter: imageFileFilter})

const  uploadRouter = express.Router()
uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get((req,res,next)=>{
    Dishes.find({})
    .then((dishes)=>{
          res.statusCode = 200
          res.setHeader('Content-Type','Application/json')
          res.json(dishes)
    }, (err)=>{
        next(err)
    })
    .catch((err)=> next(err))
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    Dishes.create(req.body)
    .then((dish) => {
        console.log('Dish Created ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.delete((req,res,next) =>{
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


// For particular dish
dishRouter.route('/:dishId')
.get((req,res,next)=>{ 
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.statusCode = 403
    res.end('This operation is not supported on /dishes/'+ req.params.dishId)
})

.put((req,res,next) =>{
    Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));

})

.delete((req,res,next) =>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})



//Comments for particular dishID
dishRouter.route('/:dishId/comments')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
          if(dish != null){
            res.statusCode = 200
            res.setHeader('Content-Type','Application/json')
            res.json(dish.comments)
          } else {
            err = new Error('Dish ' + req.params.dishId + ' not found')
            err.status = 404;
            return next(err);
          }
          
    }, (err)=>{
        next(err)
    })
    .catch((err)=> next(err))
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    Dishes.create(req.body)
    .then((dish) => {
        if(dish != null){            
            dish.comments.push(req.body)
            dish.save()
            .then((dish)=>{
                res.statusCode = 200
                res.setHeader('Content-Type','Application/json')
                res.json(dish)
            })
            res.json(dish.comments)
          } else {
            err = new Error('Dish ' + req.params.dishId + ' not found')
            err.status = 404;
            return next(err);
          }
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes/'
        + req.params.dishId + '/comments');
})

.delete((req,res,next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null) {
            for (var i = (dish.comments.length -1); i >= 0; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


// CommentID(for particular dish)
dishRouter.route('/:dishId/comments/:dishId')
.get((req,res,next)=>{ 
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+ req.params.dishId
        + '/comments/' + req.params.commentId);
})

.put((req,res,next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if (req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;                
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));

})

.delete((req,res,next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);                
            }, (err) => next(err));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})


module.exports = uploadRouter;