<template>
  <div id="mov"  class="center-block">
    <m-list></m-list>
    
  </div>
</template>

<script>
import mList from './components/movieList'

export default {
  data () {
    return {
    }
  },
  components: {
    mList
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
/*
.logo {
  width: 100px;
  height: 100px
}*/
</style>
