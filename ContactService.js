var carbon = require('carbon-io')
var o  = carbon.atom.o(module)
var __ = carbon.fibers.__(module)
var contactParameter = require('./contactParameter');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var config = require('./config/app.js');

var contactService = o({
  _type: carbon.carbond.Service,
  port: 8888,
  dbUri: config.MONGODB_URI,
  endpoints: {
    "api": o({
      _type: carbon.carbond.Endpoint,
      endpoints: {
        "contacts": o({
          _type: carbon.carbond.Endpoint,

          // GET /api/contacts - Find all contacts
          get: {
            description: 'Endpoint to retrieve full list of contacts.',
            // parameters omitted
            service: function(req) {
              return JSON.stringify(this.getService().db.getCollection('contacts').find().toArray())
            }
          },

          // POST /api/contacts - Post a contact
          post: {
            description: 'Endpoint to insert new contacts.',
            parameters: {
              contact: contactParameter
            },
            service: function(req) {
              var contact = req.body

              if(contact._id)
                contact._id = new ObjectID(contact._id)

              return JSON.stringify(this.getService().db.getCollection('contacts').insertObject(contact))
            }
          }
        }),
        "contacts/:_id" : o({
          _type: carbon.carbond.Endpoint,

          // GET /api/contacts/:_id - Find contact by _id
          get: {
            description: 'Endpoint to retrieve a specific contact by _id',
            // parameters omitted
            service: function(req) {
              return JSON.stringify(this.getService().db.getCollection('contacts')
                        .findOne({ "_id" : new ObjectID(req.params._id) }))
            }
          },

          // POST /api/contacts/:_id - Update contact by _id
          put: {
            description: 'Endpoint to update a contact.',
            parameters: {
                contact: contactParameter
            },
            service: function(req) {
              var updatedContact = req.body;

              // _id must remain of type ObjectID
              updatedContact._id = new ObjectID(req.params._id)

              return JSON.stringify(this.getService().db.getCollection('contacts')
                        .findOneAndUpdate({ "_id" : new ObjectID(req.params._id) }, updatedContact )
                      )
             }
          },
          // DELETE /api/contacts/:_id - Delete contact by _id
          delete: {
            description: 'Endpoint to delete a contact',

            // parameters omitted
            service: function(req) {
              var resp = this.getService().db.getCollection('contacts')
                .findOneAndDelete({ "_id" : new ObjectID(req.params._id) })

              return JSON.stringify(resp.value._id)
            }
          }
        })
      }
    })
  }
})

module.exports = contactService;
