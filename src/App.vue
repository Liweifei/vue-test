<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ul class="list">
      <li v-for="(item, index) in arr" :key="item.id">
        {{ item.id }}-{{ item.sex === "male" ? "男" : "女" }}
        <span style="color: blue">（{{ item.userName }}）</span> -{{ item.address }}-
      </li>
    </ul>
    <page-nation :total="total" @current-change="handeReq" :current-page="currentPage" />
    <div class="shadow" v-show="rv">加载中。。。</div>
  </div>
</template>

<script>
import pageNation from "./components/pageNation.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    pageNation,
    HelloWorld,
  },
  data: () => {
    return {
      total: 0,
      currentPage: 1,
      arr: [],
      rv: false,
    };
  },
  created() {
    this.handeReq();
  },
  methods: {
    handeReq(page = 1) {
      this.rv = true;
      this.$http
        .get("/test/users", {
          params: {
            pageIndex: page,
          },
        })
        .then((response) => {
          this.rv = false;
          console.log(response);
          const data = response.data;
          if (data.code == "200") {
            const res = data.data;
            this.total = Number(res.page.itemSum);
            this.arr = res.list;
          }
        })
        .catch(() => {
          this.rv = false;
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li{
  list-style: none;
  text-align:left;
}
.list{
  width:500px;
  margin:auto;
}
.shadow{
  position:fixed;
  left:0;
  top:0;
  width:100%;
  height:100%;
  line-height:300px;
  color:#fff;
  z-index:2;
  background-color:rgba(0,0,0,0.8);
}
</style>
