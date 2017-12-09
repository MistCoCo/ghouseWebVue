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
              <button type="button" class="btn btn-outline-info"  @click="ledControlOn">Led開啟</button>
              <button type="button"  class="btn btn-outline-info"  @click="ledControlOff">Led關閉</button>
              <h3 style="color : white">{{nowLedControl}}</h3>
            </div>
             <div class="text-center imgSize"> <img class="imgSize" :src='newlight'></div>

             <div class="text-center">
                <button type="button" class="btn btn-outline-info"  @click="windControlOn">風散開啟</button>
                <button type="button"  class="btn btn-outline-info" @click="windControlOff">風散關閉</button>
                <h3 style="color : white">{{nowWindControl}}</h3>
             </div>
            <div class="text-center imgSize"> <img class="imgSize" :src='newWind'></div>

            <div class="d-flex justify-content-between">
              <input class="inkey form-control" type="text"  placeholder="溫度上限" v-model="AutomaticTop">
              <button type="button" class="btn btn-secondary btn-lg" @click="AutomaticGo" >設定確定</button>
              <input class="inkey form-control" type="text"  placeholder="溫度下限" v-model="AutomaticDown">
            </div>
            <div class="imgSize text-center " @click="changeAutomatic"> <img  class="imgSize" :src='viewAutomatic'></div>
            <!-- <h3 style="color : white">{{nowAutomatic}}</h3>
            <h3 style="color : white">{{AutomaticLetGo}}</h3> -->
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
import swAoff from '../assets/swAOff.png'
import swAon from '../assets/swAOn.png'
import windOff from '../assets/windOff.png'
import windOn from '../assets/windOn.png'
var ref = firebase.database().ref('/lalu/')
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ['溫度:', '濕度:'],
      light:[lightOff,lightOn],
      newlight:lightOff,
      onTemp: '30',
      onHumi: '30',
      onTime: '',
      greenValue:[],
      nowLedControl:-1,
      nowAutomatic:-1,
      Automatic:[swAoff,swAon],
      viewAutomatic:swAoff,
      AutomaticLetGo:0,
      AutomaticTop:'',
      AutomaticDown:'',
      wind:[windOff,windOn],
      newWind:windOff,
      nowWindControl:-1,
    }
  },
  watch:{
      nowLedControl(){
        if(this.nowAutomatic == -1){
          let led
          let vm = this
          boardReady({board: 'Smart', device: '10y3YmrQ', transport: 'mqtt',multi: true}, function (board) {
            board.systemReset()
            board.samplingInterval = 50
            led = getLed(board, 2)
            console.log('Led手動控制判斷')
              if(vm.nowLedControl == 1){
              led.on()
              vm.newlight = vm.light[1]
              console.log('開啟')
              }
              else{
              led.off()
              vm.newlight = vm.light[0]
              console.log('關閉')
              }
        });
        }
      },
      nowWindControl(){
        if(this.nowAutomatic == -1){
          let wind
          let vm = this
          boardReady({board: 'Smart', device: '10y3YmrQ', transport: 'mqtt',multi: true}, function (board) {
            board.systemReset()
            board.samplingInterval = 50
            wind = getLed(board, 4)
            console.log('風散手動控制判斷')
              if(vm.nowWindControl == 1){
              wind.on()
              vm.newWind = vm.wind[1]
              console.log('開啟')
              }
              else{
              wind.off()
              vm.newWind = vm.wind[0]
              console.log('關閉')
              }
        });
        }
      },
      AutomaticLetGo(){
        if(this.nowAutomatic == 1){
          let led
          let wind
          let vm = this

          boardReady({board: 'Smart', device: '10y3YmrQ', transport: 'mqtt',multi: true}, function (board) {
            board.systemReset()
            board.samplingInterval = 50
            led = getLed(board, 2)
            wind = getLed(board, 4)
            console.log('自動控制判斷')
              if(vm.AutomaticDown > vm.onTemp){
                led.on()
                vm.newlight = vm.light[1]
                console.log('Led自動開啟')
              }
              else{
                led.off()
                vm.newlight = vm.light[0]
                console.log('Led動關閉')
              }
              if(vm.AutomaticTop < vm.onTemp){
                wind.on()
                vm.newWind = vm.wind[1]
                console.log('Wind自動開啟')
              }else{
                wind.off()
                vm.newWind = vm.wind[0]
                console.log('Wind動關閉')
              }
          });
        }
      }
  },
  methods:{

    ledControlOn(){
      var vm = this
      if(vm.nowAutomatic == -1){
        vm.nowLedControl = 1
      }
    },
    ledControlOff(){
      var vm = this
      if(vm.nowAutomatic == -1){
        vm.nowLedControl = -1
        }
    },
    windControlOn(){
      var vm = this
      if(vm.nowAutomatic == -1){
        vm.nowWindControl = 1
      }
    },
    windControlOff(){
      var vm = this
      if(vm.nowAutomatic == -1){
        vm.nowWindControl = -1
        }
    },
    changeAutomatic(){
      var vm = this
      if(vm.nowAutomatic != -1 ){
        vm.viewAutomatic = vm.Automatic[0]
        vm.nowAutomatic = -1
        vm.AutomaticLetGo = 0
      }else{
        vm.viewAutomatic = vm.Automatic[1]
        vm.nowAutomatic = 1
      }
    },
    AutomaticGo(){
      let vm = this
      if(vm.nowAutomatic == 1)
      vm.AutomaticLetGo += 1
      vm.nowLedControl = 0
      vm.nowWindControl = 0
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
      // let led = getLed(board, 13)
      // document.getElementById('on').addEventListener('click', function() {
      //   led.on()
      // })
      // document.getElementById('off').addEventListener('click', function() {
      //   led.off()
      // })

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
.imgSize{
  width: 80px;
  margin:0 auto;
}
.inkey{
  width: 100px;
  height: 50px;
}
</style>
