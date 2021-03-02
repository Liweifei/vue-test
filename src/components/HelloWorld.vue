<template>
  <div class="hello">
    <div v-for="(item, index) in aa" class="animate"  :key="item">
      {{ item }}
    <input></input>
    </div>
    <button class="" @click="changeid">新增一个元素</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      aa: ["A", "B", "C", "D", "E"],
    };
  },
  mounted() {
    const tre={
      name:1,
      c:[
        {
          name:2,
          c:[{
          name:"2-2",
          c:[]
        },]
        },
        {
          name:3,
          c:[{
          name:"3-3",
          c:[]
        }]
        },
        {
          name:4,
          c:[{
          name:"4-4",
          c:[]
        }]
        },
      ]
    }
    console.log(this.dfs(tre));
    console.log(this.bfs(tre));
    console.log("object :>> ");
    setTimeout(() => {
      //["A","B","C","D","E"]
      //["F","A","B","C","D","E"]
      // this.aa.unshift("F")
      // this.aa.splice(2, 0, "F");

      //["A","B","C","D","E"]
      //["A","B","F","C","D","E"]
      //this.aa.splice(2,0,"F")
    }, 5000);
  },
  methods:{
    changeid(){
      console.log("zz");
      this.aa.unshift(Math.random());
      // this.aa.push(Math.random());
      // this.aa.splice(2,0,Math.random())
    },
    dfs(obj,arr=[]){//深度优先，递归查询=>[1, 2, "2-2", 3, "3-3", 4, "4-4"]
      if(obj){
          arr.push(obj.name);
          let c=obj.c;
          for(let i=0;i<c.length;i++){
            this.dfs(c[i],arr)
          }
        }
        return arr;
    },
    bfs(obj,stack=[],nodes=[]){//广度优先，按照先进先出的顺序添加=>[1, 2, 3, 4, "2-2", "3-3", "4-4"]
      if(obj){
        stack.push(obj)
          while(stack.length){
            const item=stack.shift();
            nodes.push(item.name)
            let c=item.c;
            for(let i=0;i<c.length;i++){
              stack.push(c[i])
            }
          }
        return nodes;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.animate {
  display:block;
  width: 350px;
  /* margin-bottom: 20px;
  color: #fff;
  background: #2e8b57;
  border-radius: 3px;
  -webkit-animation: animate 5s infinite;
  animation: animate 5s infinite; */
}
@keyframes animate {
  0% {
    width: 50px;
  }
  100% {
    width: 300px;
  }
}
</style>
