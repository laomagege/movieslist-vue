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
  setMovies (movs) {
    if (_.isArray(movs)) {
      this.movies = _.object(_.map(movs, function (value) { return value._id.$id }), movs)
    }
  },
  getMovieById (id) {
    return this.movies[id]
  },
  movies: {}
}

var App = Vue.extend({
  created () {
    // 如果采用 下面的 events写法, 也是可以的, 在创建时, 会用$on 挂载事件
    // this.$on('evtGetMoviesData', function (movs) { this.cacheStore.setMovies(movs) })
  },
  data () {
    return {
      cacheStore: store
    }
  },
  events: {
    evtGetMoviesData: function (movs) { this.cacheStore.setMovies(movs) }
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
  '/movieDetail/:movieID': {
    name: 'movieDetail',
    component: movieDetail
  }
})

router.start(App, '#app')
router.go('/')
