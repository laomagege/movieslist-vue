<template>
  <div class="container-fluid">
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
</template>
<script>
import mSimple from './movieSimple'
import mPic from './moviePic'

export default {
  props: {
    movies: {
      type: Array,
      required: true
    }
  },
  destroyed () {
    console.log('module movieList: destroyed')
  },
  beforeDestroy () {
    console.log('module movieList: beforeDestroy')
  },
  created () {
    console.log('module movieList: created')
  },
  init () {
    console.log('module movieList: init')
  },
  watch: {

  },
  data () {
    return {
    }
  },
  computed: {

  },
  components: {
    // add components here
    mSimple,
    mPic
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
