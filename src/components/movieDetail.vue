<template>
  <div class="container-fluid">
    <a v-link="mov.url" class="">
      <h4>{{mov['title']}} <small>( {{mov.titleSub}} )</small></h4>
    </a>
    <dl class="dl-horizontal">
      <dt>年代</dt>
      <dd>{{mov['year']}}</dd>
      <dt>地区</dt>
      <dd>{{mov.countries | join '. '}}</dd>      
      <dt>导演</dt>
      <dd>{{mov.directors | join ', ' }} </dd>      
      <dt>主演</dt>
      <dd>{{mov.actors | join ', '}} </dd>      
      <dt>编剧</dt>
      <dd>{{mov.scenarist | join ', '}} </dd>
      <dt>标签</dt>
      <dd>{{mov.tags | join ', ' }} </dd>      

    </dl>
  </div>
</template>

<script>
export default {
  ready () {
  },
  route: {
    activate: function (transition) {
      console.log('movieDetail activate hook')
      transition.next()
    },
    canActivate: function (transition) {
      console.log('movieDetail can activate hook')
      transition.next()
    },
    data (transition) {
      console.log('movieDetail data hook')
      this.mov = this.$root.$get('cacheStore').getByID('movies', this.$route.params.movieID)
      transition.next()
    }
  },
  props: {
    // mov: {
    //   type: Object
    //   // required: true
    // }
  },
  data () {
    return {
      mov: {}
    }
  },
  methods: {

  },
  computed: {
    aliasName: function () {
      return ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
dl {
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
dt {
  float: left;
  width: 10%;
  text-align: left;
  /* adjust the width; make sure the total of both is 100% */
  padding: 0;
  margin: 0;
}
dd {
  float: left;
  width: 90%;
  /* adjust the width; make sure the total of both is 100% */
  padding: 0;
  margin: 0;
}
</style>
