hvar carbon = require('carbon-io')
var o  = carbon.atom.o(module)
var __ = carbon.fibers.__(module)

var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var config = require('./config/app.js');

var contactService= o({
  _type: carbon.carbond.Service,
  port: 8888,
  dbUri: config.MONGODB_URI,
  endpoints: {
    "api": o({
      _type: carbon.carbond.Endpoint,
      endpoints: {
        "contacts": o({
          _type: carbon.carbond.Endpoint, 
          schema: {
            type : "object",
            properties : {
              "_id": { },
              "name" : { "type" : "string" },
              "email" : { "type" : "string" },
              "phone" : {
                "type" : "object",
                "properties" : {
                  "mobile" : { "type" : "string" },
                  "work" : { "type" : "string" }
                }
              }
            },
            required: [ "_id", "name", "email" ]
          },
          // GET /api/contacts - Find all contacts 
          get: function(req) {
            return this.getService().db.getCollection('contacts').find().toArray();
          },
          // POST /api/contacts - Post a contact 
          post: function(req) {
            console.log(req.body)
            return this.getService().db.getCollection('contacts').insertObject(req.body)
          },
        }),
        "contacts/:_id" : o({
          _type: carbon.carbond.Endpoint, 
          // GET /api/contacts/:_id - Find contact by _id
          get: function(req) {
            return this.getService().db.getCollection('contacts')
              .findOne({ "_id" : new ObjectID(req.params._id) })
          },
          // POST /api/contacts/:_id - Update contact by _id
          post: function(req) {
            return this.getService().db.getCollection('contacts')
              .findOneAndUpdate({ "_id" : new ObjectID(req.params._id) }, req.body)
          },
          // DELETE /api/contacts/:_id - Delete contact by _id 
          delete: function(req) { 
            return this.getService().db.getCollection('contacts')
              .findOneAndDelete({ "_id" : new ObjectID(req.params._id) })
          }
        })
      }
    })
  }
})

module.exports = contactService;
