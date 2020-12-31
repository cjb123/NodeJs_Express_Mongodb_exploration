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

       dbOperations.insertDocument(db,{name:"masorJhul",description:"fish curry"},"dishes",(result)=>{
           console.log("Insert Documents "+ JSON.stringify(result.ops[0]));

           dbOperations.findDocuments(db,"dishes",(docs)=>{
               console.log("Found Document : \n"+ JSON.stringify(docs))

               dbOperations.updateDocument(db , {name:"masorJhul"},{description:"Freshly prepared fish curry with tomato,onion ,garlic,ginger etc"},"dishes",
               (result)=>{
                   console.log("Update Document :"+ JSON.stringify(result.result))

                   dbOperations.findDocuments(db,'dishes',(docs)=>{
                          console.log("Found Documents : \n"+ JSON.stringify(docs))

                          db.dropCollection("dishes",(result)=>{
                                console.log("Dropped Collection : "+ result)
                                client.close()
                        })
                          
               })
           })
       })
})
})