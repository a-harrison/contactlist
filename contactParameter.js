module.exports = {
  description: 'An object representing a contact and the means to reach them.',
  location: 'body',
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
    required: [ "name", "email" ]
  },
  required: true
}
