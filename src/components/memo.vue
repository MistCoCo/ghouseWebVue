<template>
  <div class="bg">
    <div class="container">
      <div class="row flex-column align-items-center">
        <div class="col-8">
          <div class="box">{{msg}}</div>
        </div>
        <div class="col-8">
          <div class="box">312312222</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldw',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
    background:rgba(178, 190, 189, 0.6)
}
.box{
  height:500px;
  background:rgba(122, 126, 131, 0.3)
}
.gd-cover{
  background-size:cover;
  background-position:center center ;
}
.bg{
  background-image: url('../assets/01.jpeg');
  background-size:cover;
  background-position:center center ;
}
</style>
