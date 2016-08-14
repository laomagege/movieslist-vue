<template>
  <div id="mov"  class="center-block">
    <div class="row">
      <div class="col-xs-10">
        <v-pagination :pagination="pagination" :offset="3"></v-pagination>
      </div>
      <div class="col-xs-2">
        <select v-on:change="loadData" v-model="pagination.per_page" class="form-control right pagenum-list" debounce="300">
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

export default {
  destroyed () {
    console.log('module movApp: destroyed')
  },
  beforeDestroy () {
    console.log('module movApp: beforeDestroy')
  },
  created () {
    console.log('module movApp: created')
    if (this.movies && this.movies.length === 0) {
      this.loadData()
    }
  },
  init () {
    console.log('module movApp: init')
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
      // if (this.pagination.current_page !== page) {
      //   this.pagination.current_page = page
      //   this.loadData()
      // }
      // this.pagination.current_page = page
      this.loadData()
    }
  },
  methods: {
    // add methods here
    loadData: function () {
      this.$http.get('/papi/movies/' + this.pagination.current_page + '/' + this.pagination.per_page).then(function (response) {
        var rdata = JSON.parse(response.data)
        this.$set('movies', rdata.movies)
        this.$set('pagination', rdata.pagination)
        // save it to the app cache
        this.$dispatch('evtGetMoviesData', rdata.movies)
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
