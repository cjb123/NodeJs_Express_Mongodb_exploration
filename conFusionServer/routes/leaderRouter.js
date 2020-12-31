const express = require('express');
const bodyParser = require('body-parser')
const leaderRouter = express.Router()

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain');
    next();
})

// next() will execute the next command(get, post, put etc) after the execution of the the 1st 2 lines.
.get((req,res,next)=>{
    res.end('Will send the name of all leaders')
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.end('Will add the leader :'+ req.body.name + ' with details :'+ req.body.descripton)
})

.put((req,res,next) =>{
    res.end('This operation is not supported on /leaders ')
})

.delete((req,res,next) =>{
    res.end('Deleting all leaders! ')
});


// For particular dish
leaderRouter.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{ 
    res.end('Will send the  information of leader with Id : ' + req.params.leaderId + ' to you')
})

//The bodyParser will add the body to the req parameter
.post((req,res,next) =>{
    res.end('This operation is not supported on /leaders/'+ req.params.leaderId)
})

.put((req,res,next) =>{
    res.write('Updating the leader information : '+ req.params.leaderId);
    res.end('Will update the leader information for leader : '+ req.body.name + 'with details' + req.body.descripton)

})

.delete((req,res,next) =>{
    res.end('Deleting  leader info : '+ req.params.leaderId);
})


module.exports = leaderRouter;