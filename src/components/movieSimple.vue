<template>
  <div class="container-fluid">
    <a v-link="{ name: 'movieDetail', params: { movieID: mov._id.$id }}" class="">
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
      <dd>{{actorsMore}} </dd>      
      <dt>编剧</dt>
      <dd>{{scenaristsMore}} </dd>
      <dt>标签</dt>
      <dd>{{mov.tags | join ', ' }} </dd>      

    </dl>
  </div>
</template>

<script>
export default {
  props: {
    mov: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    more (arr, maxLength, sep, moreTxt) {
      if (Array.isArray(arr)) {
        if (arr.length > maxLength) {
          return arr.slice(0, maxLength).join(sep) + sep + moreTxt
        } else {
          return arr.join(sep)
        }
      } else {
        return arr
      }
    }
  },
  computed: {
    aliasName: function () {
      return ''
    },
    scenaristsMore: function () {
      return this.more(this.mov.scenarist, 3, ', ', '...')
    },
    actorsMore: function () {
      return this.more(this.mov.actors, 3, ', ', '...')
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
