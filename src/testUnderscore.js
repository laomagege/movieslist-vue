var _ = require('underscore')

var objTest = [{id: 1, val: 11}, {id: 2, val: 22}, {id: 3, val: 33}, {id: 4, val: 44}]

// _.map to an array obj
console.log(_.map(objTest, function (value) {
  return value.id
}))

// _.object convert to an hashmap(=object)
var newobj = _.object(_.map(objTest, function (value, index, list) {
  return value.id
}), objTest)
console.log(newobj)

