<template>
  <div class="bg">
    <div class="HelloWorld container">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <div class="box">
            <h2>{{msg[0]}}{{onTemp}}</h2>
            <h2>{{msg[1]}}{{onHumi}}</h2>
            <span>{{onTime}}</span>
            <div class="text-center">
              <button type="button" class="btn btn-outline-info" id="on">開啟</button>
              <button type="button" class="btn btn-outline-info" id="off">關閉</button>
              <button type="button" class="btn btn-outline-info" id="onn" @click="ledOn">開啟測試</button>
              <button type="button"  class="btn btn-outline-info" id="offf" @click="ledOff">關閉測試</button>
            </div>
            <div class="text-center" @click="lightchange">
              <img class="imglight" :src='newlight'>
            </div>
            <div class="d-flex justify-content-between">
              <input class="inkey" type="text"  placeholder="溫度上限">
              <input class="inkey" type="text"  placeholder="溫度下限">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lightOff from '../assets/lightOff.png'
import lightOn from '../assets/lightOn.png'
import switchOff from '../assets/switchOff.png'
import switchOn from '../assets/switchOn.png'
var ref = firebase.database().ref('/lalu/')
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ['溫度:', '濕度:'],
      light:[lightOff,lightOn],
      newlight:lightOn,
      onTemp: '',
      onHumi: '',
      onTime: '',
      greenValue:[],

    }
  },
  methods:{
    lightchange:function(){
      let li = this
      if(li.light[0] == li.newlight){
        li.newlight = li.light[1]
        console.log('開燈')
      }else{
        li.newlight = li.light[0]
        console.log('關燈')
      }
    },
    ledOn(){
      let led
      boardReady({board: 'Smart', device: '10y3YmrQ', transport: 'mqtt',multi: true}, function (board) {
        board.systemReset();
        board.samplingInterval = 50;
        led = getLed(board, 2);
        document.getElementById('onn').addEventListener('click', function() {
          led.on();
      })
      });
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
    boardReady({device: 'nYykx',multi: true}, function (board) {
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
      }, 6000000)
    })
  },

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar{
    background:rgba(178, 190, 189, 0.6)
}
.box{
  width:500px;
  height:500px;
  background:rgba(122, 126, 131, 0.3)
}
.gd-cover{
  background-size:cover;
  background-position:center center ;
}
.bg{
  height:90vh;
  background-image: url('../assets/01.jpeg');
  background-size:cover;
  background-position:center center ;
}
.imglight{
  width: 100px;
}
.inkey{
  width: 100px;
  height: 50px;
}
</style>
