var assert = require('assert');
const mongoClient = require('mongodb').MongoClient
const dbOperations = require('./operations')

const url = 'mongodb://localhost:27017/'
const dbname = 'conFusion'

mongoClient.connect(url).then((client)=>{
        assert.strictEqual(err,null)
        console.log("Connected to server")
        const db = client.db(dbname)

        return dbOperations.insertDocument(db,{name:"masorJhul",description:"fish curry"},"dishes")        
        .then((result)=>{

        console.log("Insert Documents "+ JSON.stringify(result.ops[0]));
        return dbOperations.findDocuments(db,"dishes")
        }).then((docs)=>{

        console.log("Found Document : \n"+ JSON.stringify(docs))
        return dbOperations.updateDocument(db , {name:"masorJhul"},{description:"Freshly prepared fish curry with tomato,onion ,garlic,ginger etc"},"dishes",)
        }).then((result)=>{

        console.log("Update Document :"+ JSON.stringify(result.result))
        return dbOperations.findDocuments(db,'dishes')
        }).then((docs)=>{

        console.log("Found Documents : \n"+ JSON.stringify(docs))
        return db.dropCollection("dishes")
        }).then((result)=>{

        console.log("Dropped Collection : "+ result)
        client.close()
        }).catch((err)=>console.log(err))

}).catch((err)=>console.log(err))