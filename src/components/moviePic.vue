<template>
    <img :src="mov.images[0].path | prepend '/static/bttt/'" 
      class="img-responsive img-rounded" alt="{{mov.title}}">
      <p>
        <a :href="mov.douban" rel="nofollow" target="_blank" title="去豆瓣查看影片介绍">
          <i class="iconfont">&#xe94a;</i>
        </a>
      </p>
      <p>
        <a :href="mov.imdbId | prepend 'http://www.imdb.com/title/'" rel="nofollow" target="_blank" title="去IMDB查看影片介绍">
          <i class="iconfont">&#xe631;</i>
        </a>
      </p>
</template>

<script>
// import iconfont from 'css!../font/iconfont.css'
require('../font/iconfont.css')
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.iconfont {
  font-size: 20px;
}  
/*p {
    margin: 1px 0 1px;
}*/
</style>
