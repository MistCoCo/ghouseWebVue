<template>
  <div class="bg">
    <div class="memo container">
      <div class="row">
        <div class="col-12 flex-column align-items-center">
          <div class="box text-center">
            <input type="text"  placeholder="輸入文字"
              @keyup.enter="addtodo(newtodo)" v-model="newtodo">
            <ul>
              <div v-if="all == 0">
                <li v-for="todo in todos" v-bind:class={active:todo.completed}>
                  <input type="checkbox" v-model="todo.completed">
                  {{todo.content}}
                  - <a href="#" @click.prevent="removeTodo(todo)">刪除</a>
                </li>
              </div>
              <div v-if="all == 1">
                <li v-for="todo in todos" v-bind:class={active:todo.completed} v-if="todo.completed == true">
                  <input type="checkbox" v-model="todo.completed">
                  {{todo.content}}
                  - <a href="#" @click.prevent="removeTodo(todo)">刪除</a>
                </li>
              </div>
              <div v-if="all == 2">
                <li v-for="todo in todos" v-bind:class={active:todo.completed} v-if="todo.completed == false">
                  <input type="checkbox" v-model="todo.completed">
                  {{todo.content}}
                  - <a href="#" @click.prevent="removeTodo(todo)">刪除</a>
                </li>
              </div>
            </ul>
            <button @click="allcompleted" type="button" class="btn btn-outline-success">全部已讀</button>
            <button @click="readRemove" type="button" class="btn btn-outline-success">打勾移除</button>
            <pre></pre>
            <button @click="allRead" type="button" class="btn btn-outline-success">全部顯示</button>
            <button @click="yesRead" type="button" class="btn btn-outline-success">已讀</button>
            <button @click="noRead" type="button" class="btn btn-outline-success">未已讀</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'memo',
  data () {
    return {
      todos:[],
      newtodo:'',
      all: 0,
      retodo:[],
    }
  },
  methods:{
    addtodo:function(todo){
      this.todos.push({content:todo,completed:false});
    },
    removeTodo:function(todo){
      this.todos.splice(this.todos.indexOf(todo),1);
    },
    allcompleted:function(){
      var todolong =this.todos.length;
      for(var i=0 ; i<todolong;i++){
        this.todos[i].completed = true;
      }
    },
    readRemove:function(){
      this.retodo =  this.todos.filter(function(item, index, array){
         return   item.completed !== true ;
      });
      this.todos = this.retodo
    },
    allRead:function(){
      this.all = 0;
    },
    yesRead:function(){
      this.all = 1;
    },
    noRead:function(){
      this.all = 2;
    },
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
  background-position:center center;
}
.bg{
  background-image: url('../assets/01.jpeg');
  background-size:cover;
  background-position:center center;
  height:100vh;
}
</style>
