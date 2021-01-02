const assert = require('assert')

exports.insertDocument = (db,document,collection,callback) =>{
       const collect = db.collection(collection)
       //The mongodb driver of Node supports promises natively.So  we return the  promises
       return collect.insert(document) 
}

exports.findDocuments = (db,collection,callback)=>{
       const collect = db.collection(collection)
       return collect.find({}).toArray()
}

exports.removeDocument = (db,document,collection,callback)=>{
       const collect = db.collection(collection)
       return collect.deleteOne(document)
}

exports.updateDocument = (db,document,update,collection,callback)=>{
      const collect = db.collection(collection)
      return collect.updateOne(document)
}