<template>
  <div class="container-fluid">
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
      <table class="table">
        <thead>
          <!--<tr>
            <th v-for="key in columns"
              @click="sortBy(key)"
              :class="{active: sortKey == key}">
              {{key | capitalize}}
              <span class="arrow"
                :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
          </tr>-->
        </thead>
        <tbody>
          <tr v-for="mov in movies">
            <td width="135px">
              <m-pic :mov="mov"></m-pic>
            </td>
            <td>
              <m-simple :mov="mov"></m-simple>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-md-12"><v-pagination :pagination="pagination" :offset="3"></v-pagination></div>
    </div>
  </div>
</template>
<script>
import mSimple from './movieSimple'
import mPic from './moviePic'
import vPagination from 'vue-bootstrap-pagination'

export default {
  destroyed () {
    console.log('module movieList: destroyed')
  },
  beforeDestroy () {
    console.log('module movieList: beforeDestroy')
  },
  created () {
    console.log('module movieList: created')
    if (this.movies && this.movies.length === 0) {
      this.loadData()
    }
  },
  init () {
    console.log('module movieList: init')
  },
  watch: {
    // 'pagination.current_page': function () {
    //   this.loadData()
    // }
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
  computed: {

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
    // add components here
    mSimple,
    mPic,
    vPagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
