<template>
  <div class="bg">
    <div class="HelloWorld container">
      <div class="row flex-column align-items-center">
        <div class="col-8">
          <div class="box">
            <h1>{{msg[0]}}{{onTemp}}</h1>
            <h1>{{msg[1]}}{{onHumi}}</h1>
            <span>{{onTime}}</span>
            <input type="button" value="開啟" id="on">
            <input type="button" value="關閉" id="off">
          </div>
        </div>
        <div class="col-8">
          <div class="box">312312222</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var ref = firebase.database().ref('/lalu/')
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ['溫度:', '濕度:'],
      onTemp: '',
      onHumi: '',
      onTime: '',
      greenValue:[]
    }
  },
  mounted() {
    function get_time(t) {
      let varTime = new Date(),
          varHours = varTime.getHours(),
          varMinutes = varTime.getMinutes(),
          varSeconds = varTime.getSeconds();
      let varNow;
      if (t == "hms") {
        varNow = varHours + ":" + varMinutes + ":" + varSeconds;
      } else if (t == "h") {
        varNow = varHours;
      } else if (t == "m") {
        varNow = varMinutes;
      } else if (t == "s") {
        varNow = varSeconds;
      }
      return varNow;
    }
    let vm = this
    boardReady({device: 'nYykx'}, function (board) {
      board.systemReset()
      board.samplingInterval = 250
      let led = getLed(board, 13)
      document.getElementById('on').addEventListener('click', function() {
        led.on()
      })
      document.getElementById('off').addEventListener('click', function() {
        led.off()
      })
      //溫濕度抓取
      let dht = getDht(board, 11)
      dht.read(function (evt) {
        vm.onTemp = dht.temperature
        vm.onHumi = dht.humidity
        vm.onTime = get_time("hms")
        let timestamp = Math.floor(Date.now() / 1000)
        //送出到firebase
        if(vm.onTemp !== null && vm.onHumi !== null){
          ref.child(timestamp).set({
            time: vm.onTime,
            temp: vm.onTemp,
            humi: vm.onHumi
          })
        }
        console.log({
          time: vm.onTime,
          temp: vm.onTemp,
          humi: vm.onHumi
        })
      }, 60000)
    })
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
