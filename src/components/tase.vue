<template>
  <div class="bg">
    <div class="tase">
      <!-- 物件和他第幾張(p,pid) -->
      <div class="postit" v-for="(p,pid) in postits"
      :style="postitCss(p)" @mousedown="selectId($event,pid)">
      <!-- $event當按下去會包成event傳出去 -->
        <div class="text">{{p.text}}</div>
      </div>
      <!-- 控制面板 -->
      <ul class="datalist">
          <li>
            <h3 style="color : white">{{nowId}}</h3>
            </li>
          <li v-for="(p,pid) in postits">
            <input v-model="p.text">
            <!-- <input v-model="p.color"> -->
            <div class="colorList">
              <div class="block" v-for="color in colorList" :style="{backgroundColor: color.color}"
              @click="p.color=color.name"></div>
            </div>
          </li>
          <button type="button" @click="addPostit">新增便利貼</button>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'tase',
  data () {
    return {
      colorList:[
        {
          name:"yellow",
          color:"#FEFD65"
        },
        {
          name:"green",
          color:"#87FA81"
        },
        {
          name:"orange",
          color:"#FBB45C"
        },
        {
          name:"blue",
          color:"#5D9DEB"
        }
      ],
      postits:[
        {
        text:"你好啊",
        color:"yellow",
        pos: { x:20 , y:80 }
        },
        {
        text:"大狗",
        color:"yellow",
        pos: { x:20 , y:380 }
        },
      ],
      nowId: -1,
      mousePos:{
        x:0,
        y:0
      },
      startMousePos:{
        x:0,
        y:0
      }
    }
  },
  watch:{
    mousePos(){
      if(this.nowId != -1){
        let nowPostit = this.postits[this.nowId]
        nowPostit.pos.x = this.mousePos.x-this.startMousePos.x
        nowPostit.pos.y = this.mousePos.y-this.startMousePos.y
      }
      //starMousePos 用意計算偏移量會比較順
      console.log(this.mousePos)
    }
  },
  methods:{
    // css變成js 可以把 -改變成是接大寫
    // 'font-size'  改成 fontSize
    // 'background-color' 改成 backgroundColor
    postitCss(p){
      return {
        left: p.pos.x+"px",
        top:p.pos.y+"px",
        'font-size':((240-10) / p.text.length)-10 + 'px',
        // 在colorList找傳進去內容o o.name符合p.color的顏色
        backgroundColor: this.colorList.find(o=>o.name== p.color ).color
      }
    },
    selectId(evt,id){
      console.log(id)
      this.nowId = id
      this.startMousePos = {
        x: evt.offsetX,
        y: evt.offsetY,
      }
    },
    addPostit(){
      this.postits.push(
        {
          text:"文字輸入",
          color:"yellow",
          pos: { x:200+Math.random()*200 , y:200+Math.random()*200 }
        }
      )
    },
    getColor(){
      return this.colorList.find(o=>o.name== p.color).color
    },
  },
  mounted(){

    // 抓取滑鼠資料修改pos
    var vm = this;
    window.onmousemove = (evt) =>{
      if(vm.nowId!= -1){
        vm.mousePos = {x: evt.pageX, y: evt.pageY}
      // vm.mousePos.x = evt.pageX
      // vm.mousePos.y = evt.pageY
      }
    }
    //當滑鼠放開 會設定回-1
    window.onmouseup = () =>{
      vm.nowId = -1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import
url(//fonts.googleapis.com/earlyaccess/notosanstc.css);

*,*,*:before,*:after{
  // border:solid 1px;
  font-family: 'Noto Sans TC', sans-serif;
  color: #44403F;
}
$color-yellow: #FEFD65 ;
$color-green: #87FA81 ;
$color-orange: #FBB45C ;
$color-Blue: #5D9DEB ;
@mixin size($w,$h:$w){
  width: $w;
  height: $h;
}
$colorBack: #3E3A39 ;
.bg{
  background-color: $colorBack;
  height: 100vh;
  padding: 0;
  margin: 0;
  // @include size(100%);
}
.block{
  @include size(30px);
  display: inline-block;
}

.postit{
  @include size(240px);
  font-size: calc(240px/ 4 - 15px);
  //字中
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $color-yellow;
  //字距放大
  letter-spacing: 10px;
  //字寬
  font-weight: 500 ;
  //便利貼陰影
  box-shadow: 15px 10px 40px rgba(black,0.4);
  //絕對位置
  position: absolute;
  //屬性css 慢慢的改變
  transition: background-color 0.5s;
}
.datalist{
  position: fixed;
  right: 10px;
  top:120px;
  width:30%;
}
.colorList{
  width:300px;
}
</style>
