import Vue from 'vue'
// import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueFilter from 'vue-filter'
import _ from 'underscore'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueFilter)
Vue.config.debug = true

// for location cache
var store = {
  set (propName, val, idfunc) {
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
  },
  get (propName) {
    if (_.isArray(this[propName])) {
      return this[propName]
    } else if (_.isObject(this[propName])) {
      return _.clone(this[propName])
    } else {
      return this[propName]
    }
  },
  getByID (propName, id) {
    if (_.isArray(this[propName])) {
      if (this['idMap' + propName]) {
        return this[propName][this['idMap' + propName][id]]
      }
    } else if (_.isObject(this[propName])) {
      return this[propName][id]
    }

    return undefined
  }
}

var App = Vue.extend({
  created () {
    // 如果采用 下面的 events写法, 也是可以的, 在创建时, 会用$on 挂载事件
    // this.$on('evtCacheData', function (movs) { this.cacheStore.setMovies(movs) })
  },
  data () {
    return {
      cacheStore: store
    }
  },
  events: {
    evtCacheData: function (cacheData) {
      this.cacheStore.set('movies', cacheData.movs, function (item) { return item._id.$id })
      this.cacheStore.set('page', cacheData.page)
    }
  }
})

var router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true,
  transitionOnLoad: true
})

import movieApp from './movApp'
import movieDetail from './components/movieDetail'

router.map({
  '/': {
    name: 'movieApp',
    component: movieApp
  },
  '/movieApp/:page/:pageNum': {
    name: 'movieApp',
    component: movieApp
  },
  '/movieDetail/:movieID': {
    name: 'movieDetail',
    component: movieDetail
  }
})

router.start(App, '#app')
router.go('/')
