<template>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
</template>

<script>
var ref = firebase.database().ref('/lalu/')
export default {
  name: 'pepe',
  data () {
    return {
      chartData: {},
      chartSettings: {},
    }
  },
  mounted(){
    let vm = this
    let message = []
    //使用timestamp排序從database抓取下來
    ref.orderByChild('timestamp').on('value', function(snapshot){
      // 一個一個值取出來丟入陣列裡
      snapshot.forEach(function(ele){
        message.unshift(ele.val())
        console.log(message)
      });
    })
    vm.chartData = {
        columns: ['日期', '濕度', '溫度'],
        rows: [
          { '溫度': message[5].temp, '日期': message[5].time, '濕度': message[5].humi},
          { '溫度': message[4].temp, '日期': message[4].time, '濕度': message[4].humi},
          { '溫度': message[3].temp, '日期': message[3].time, '濕度': message[3].humi},
          { '溫度': message[2].temp, '日期': message[2].time, '濕度': message[2].humi},
          { '溫度': message[1].temp, '日期': message[1].time, '濕度': message[1].humi},
          { '溫度': message[0].temp, '日期': message[0].time, '濕度': message[0].humi},
        ]
      }
      vm.chartSettings = {
        metrics: ['濕度', '溫度'],
        dimension: ['日期']
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
