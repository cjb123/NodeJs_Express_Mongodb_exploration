const mongoose = require('mongoose');
const Dishes = require('./models/dishes2');

const url = 'mongodb://localhost:27017/conFusion'
const  connect = mongoose.connect(url)

connect.then((db)=>{

    console.log('Connected correctly to mongodb server')

    Dishes.create({
        name: 'Panner Malai kofta',
        description: 'Panner kofta cooked with butter and malai'
    })
    .then((dish)=>{
        console.log(dish)
        return Dishes.findByIdAndUpdate(dish._id , { $set: {description: "panner balls cooked with malai cream and made into a curry"}
    },{ new : true
    }).exec()
    })
    .then((dish)=>{
        console.log(dish)
        dish.comments.push({
            rating: 5,
            comment: 'fresh ingredients and beautifully cooked',
            author: 'Arnod Venked'
        })
        return dish.save()
    })
    .then((dish)=>{

        console.log("Satan"+ dish.comments)
        return Dishes.remove({})
    }).then(()=>{
        return mongoose.connection.close()
    }).catch((err)=>{{
        console.log(err)
    }})

})