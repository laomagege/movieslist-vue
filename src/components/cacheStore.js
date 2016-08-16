var _ = require('underscore')
module.exports = function CacheStore () {
  this.name = 'class cacheStore'
  if (CacheStore._init === undefined) {
    console.log('CacheStore init ..., should only run once')
    CacheStore.prototype.set = function (propName, val, idfunc) {
      if (_.isArray(val)) {
        this[propName] = val
        // if idfunc provide, create an idMap for this array
        if (_.isFunction(idfunc)) {
          this['idMap' + propName] = {}
          _.each(this[propName], function (item, index, list) {
            this['idMap' + propName][idfunc(item)] = index
          }, this)
        }
      } else if (_.isObject(val)) {
        this[propName] = _.clone(val)
      } else {
        this[propName] = val
      }
    }
    CacheStore.prototype.get = function (propName) {
      if (_.isArray(this[propName])) {
        return this[propName]
      } else if (_.isObject(this[propName])) {
        return _.clone(this[propName])
      } else {
        return this[propName]
      }
    }
    CacheStore.prototype.getByID = function (propName, id) {
      if (_.isArray(this[propName])) {
        if (this['idMap' + propName]) {
          return this[propName][this['idMap' + propName][id]]
        }
      } else if (_.isObject(this[propName])) {
        return this[propName][id]
      }

      return undefined
    }
    CacheStore._init = true
  }
}
