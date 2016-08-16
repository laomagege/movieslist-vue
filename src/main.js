import Vue from 'vue'
// import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueFilter from 'vue-filter'
// import _ from 'underscore'
import CacheStore from './components/cacheStore.js'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueFilter)
Vue.config.debug = true

var localStore = new CacheStore()
console.log('localStore.constructor === CacheStore' + localStore.constructor === CacheStore)
console.log('localStore instanceof CacheStore' + localStore instanceof CacheStore)

var App = Vue.extend({
  created () {
    // 如果采用 下面的 events写法, 也是可以的, 在创建时, 会用$on 挂载事件
    // this.$on('evtCacheData', function (movs) { this.cacheStore.setMovies(movs) })
  },
  data () {
    return {
      cacheStore: localStore
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
