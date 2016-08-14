// var txt = '[{"id":"117", "array":[1, 2, 3, 4]},{"id":"118", "array":[1, 2, 3, 4, 5, 6]}]'
// var obj = JSON.parse(txt)
// console.log(obj)

var undefinedIsArray = Array.isArray(undefined)
console.log(undefinedIsArray)

var arr = []
var arrIsArray = Array.isArray(arr)
console.log(arrIsArray)

var condition = null
if (condition) {
  console.log(condition)
}

function getLen (obj) {
  var length = obj ? obj['length'] : -1
  return length
}

var obj = null
console.log('null = ' + getLen(obj))
obj = NaN
console.log('NaN = ' + getLen(obj))
obj = undefined
console.log('NaN = ' + getLen(obj))
obj = ['1']
console.log('array = ' + getLen(obj))

obj = {}
var length = obj.length
console.log(length)
var equ = typeof length === 'number'
console.log(equ)
