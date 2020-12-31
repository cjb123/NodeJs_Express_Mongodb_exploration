const assert = require('assert')

exports.insertDocument = (db,document,collection,callback) =>{
       const collect = db.collection(collection)
       collect.insert(document , (err,result)=>{
           assert.strictEqual(err, null)
           console.log("Inserted : "+ result.result.n + " document into the collection : " + collection)
           callback(result);
       })
}

exports.findDocuments = (db,collection,callback)=>{
       const collect = db.collection(collection)
       collect.find({}).toArray((err,docs)=>{
           assert.strictEqual(err,null)
           callback(docs)
       })
}

exports.removeDocument = (db,document,collection,callback)=>{
       const collect = db.collection(collection)
       collect.deleteOne(document , (err,result)=>{
        assert.strictEqual(err, null)
        console.log("Removed the :"+ document + "document from collection : "+ collection)
        callback(result);
    })
}

exports.updateDocument = (db,document,update,collection,callback)=>{
      const collect = db.collection(collection)
      collect.updateOne(document , {$set : update},null , (err , result)=>{
            assert.strictEqual(err , null)
            console.log("Updated the document : "+ JSON.stringify(document) + "with updates : "+ JSON.stringify(update))
            callback(result)

      })
}