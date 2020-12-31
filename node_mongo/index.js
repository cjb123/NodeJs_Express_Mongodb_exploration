var assert = require('assert');
const mongoClient = require('mongodb').MongoClient
const dbOperations = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

mongoClient.connect(url , (err,client)=>{
       assert.strictEqual(err,null)
       console.log("Connected to server")

       const db = client.db(dbname)
       const collection = db.collection('dishes')

       collection.insertOne({'name': 'chicken korma','description': ' Chicken made with a fragnant masala'},(err,result)=>{
           assert.strictEqual(err, null)
           console.log('Inserted : \n')
           console.log(result.ops) //ops provide no of times operations carried out

           collection.find({}).toArray((err,docs)=>{
                 assert.strictEqual(err,null)

                 console.log('Found :\n')
                 console.log(docs)
                 db.dropCollection('dishes',(err,result)=>{
                     assert.strictEqual(err,null)
                     client.close()
                 })
           })
       })
})