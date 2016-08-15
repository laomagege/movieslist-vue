<template>
  <div id="mov"  class="center-block">
    <div class="row">
      <div class="col-xs-10">
        <v-pagination :pagination="pagination" :offset="3"></v-pagination>
      </div>
      <div class="col-xs-2">
        <select v-on:change="pageNumChanged" v-model="pagination.per_page" class="form-control right pagenum-list" debounce="300">
          <option>5</option>
          <option>10</option>
          <option>20</option>
          <option>50</option>
          <option>100</option>
        </select>
        
      </div>                 
    </div>
    <div class="row">
      <m-list :movies='movies'></m-list>
    </div>        
    <div class="row">
      <div class="col-md-12"><v-pagination :pagination="pagination" :offset="3"></v-pagination></div>
    </div>    
    
  </div>
</template>

<script>
import vPagination from 'vue-bootstrap-pagination'
import mList from './components/movieList'
import _ from 'underscore'

export default {
  destroyed () {
    console.log('module movApp: destroyed')
  },
  beforeDestroy () {
    console.log('module movApp: beforeDestroy')
  },
  created () {
    console.log('module movApp: created')
    // if (this.movies && this.movies.length === 0) {
    //   this.loadData()
    // }
  },
  init () {
    console.log('module movApp: init')
  },
  route: {
    activate: function (transition) {
      console.log('movApp activate hook')
      transition.next()
    },
    canActivate: function (transition) {
      console.log('movApp can activate hook')
      transition.next()
    },
    data (transition) {
      console.log('movApp data hook')
      if (this.$route.params.page && this.$route.params.pageNum) {
        this.pagination.current_page = this.$route.params.page
        this.pagination.per_page = this.$route.params.pageNum
      } else {
        this.pagination.current_page = 1
        this.pagination.per_page = 10
      }

      // popState is called, and the route.data need re-query from server.
      this.loadData(true)

      transition.next()
    }
  },
  data () {
    return {
      movies: [],
      // resource_url: '/papi/movies'
      pagination: {
        last_page: 0,
        per_page: 10,
        from: 1,
        to: 1,
        current_page: 1
      }
    }
  },
  events: {
    evtPageChanged: function (page) {
      this.loadData()
    }
  },
  methods: {
    pageNumChanged: function (event) {
      this.loadData()
    },
    cacheValid: function () {
      var pg = this.$root.$get('cacheStore').page
      var movs = this.$root.$get('cacheStore').movies
      return (pg.current_page === this.pagination.current_page &&
      pg.per_page === this.pagination.per_page &&
      Array.isArray(movs) &&
      movs.length > 0)
    },
    loadData: function (routeData) {
      routeData = (routeData || false)
      // push state every time pull the data, so user can back to this point
      var history = window.history
      if (!routeData) {
        var url = '/movieApp/' + this.pagination.current_page + '/' + this.pagination.per_page
        history.pushState({}, '', url)
      }
      console.log('Debug purpose: history length count:' + history.length)

      // try to load cache data first
      if (this.cacheValid()) {
        this.$set('movies', this.$root.$get('cacheStore').movies)
        this.pagination = _.clone(this.$root.$get('cacheStore').page)
        return
      }

      this.$http.get('/papi/movies/' + this.pagination.current_page + '/' + this.pagination.per_page).then(function (response) {
        var rdata = JSON.parse(response.data)
        this.$set('movies', rdata.movies)
        this.$set('pagination', rdata.pagination)
        // save it to the app cache
        this.$dispatch('evtCacheData', {movs: rdata.movies, page: rdata.pagination})
      }, function (error) {
        // handle error
        console.log('get movies data failed!!!' + error)
      })
    }
  },
  components: {
    mList,
    vPagination
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  /*display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;*/
}

#mov {
  color: #2c3e50;
  max-width: 800px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  
  /*margin-top: -100px;
  text-align: center;*/
}

#app a {
  color: #42b983;
  text-decoration: none;
}
.right {
    margin: 20px 0;
    float: right;
    /*width: 300px;
    border: 3px solid #73AD21;
    padding: 10px;
    vertical-align: middle;*/
    /*align-items:center;
    align-content:center;*/
}
.pagenum-list {
  width: 75px;
}
</style>
