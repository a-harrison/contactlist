var carbon = require('carbon-io')
var o  = carbon.atom.o(module).main
var __ = carbon.fibers.__(module).main
var _o = carbon.bond._o(module)

__(function() {
  module.exports = o({
    _type: carbon.carbond.test.ServiceTest,
    name: "ContactServiceTest",
    service: _o('../ContactService'), // path to your Service
    tests: [
      {
        reqSpec: {
          url: '/api/contacts',
          method: 'POST',
          body: {
            "_id" : "58deedd0d604c62b368f62db",
            "name": "John Doe",
            "email" : "johndoe@test.com",
            "phone" : {
              "work" : "123-456-7890",
              "mobile" : "123-456-7890"
            }
          }
        },
        resSpec: {
          statusCode: 200
        }
      },
      {
        reqSpec: {
          url: '/api/contacts',
          method: 'GET'
        },
        resSpec: {
          statusCode: 200
        }
      },
      // Expected post failure due to failed schema validation
      {
        reqSpec: {
          url: '/api/contacts',
          method: 'POST',
          body: {
            "name": "John Doe",
            "phone" : {
              "work" : "123-456-7890",
              "mobile" : "123-456-7890"
            }
          }
        },
        resSpec: {
          statusCode: 400,
          body: {
            "code": 400,
            "description": "Bad Request",
            "message": "Validation failed for parameter 'contact'. Reason: Missing required property: email. Schema: {\"type\":\"object\",\"properties\":{\"_id\":{},\"name\":{\"type\":\"string\"},\"email\":{\"type\":\"string\"},\"phone\":{\"type\":\"object\",\"properties\":{\"mobile\":{\"type\":\"string\"},\"work\":{\"type\":\"string\"}}}},\"required\":[\"name\",\"email\"]}. Value: {\"name\":\"John Doe\",\"phone\":{\"work\":\"123-456-7890\",\"mobile\":\"123-456-7890\"}}"
          }
        }
      },
      // GET Single contact
      {
        reqSpec: {
          url: '/api/contacts/58deedd0d604c62b368f62db',
          method: 'GET'
        },
        resSpec: {
          statusCode: 200,
          body: {
              "_id":"58deedd0d604c62b368f62db",
              "name":"John Doe",
              "email":"johndoe@test.com",
              "phone": {
                "work":"123-456-7890",
                "mobile":"123-456-7890"
              }
          }
        }
      },
      // Update single contact
      {
        reqSpec: {
          url: '/api/contacts/58deedd0d604c62b368f62db',
          method: 'PUT',
          body: {
            "name": "John Doe",
            "email": "john@test.com",
            "phone" : {
              "work" : "123-456-7890",
              "mobile" : "123-456-7890"
            }
          }
        },
        resSpec: {
          statusCode: 200
        }
      },
      // Delete contact
      {
        reqSpec: {
          url: '/api/contacts/58deedd0d604c62b368f62db',
          method: 'DELETE'
        },
        resSpec: {
          statusCode: 200
        }
      },
    ]
  })
})
