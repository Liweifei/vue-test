<template>
  <div class="pageNation">
    <ul>
      <li class="pre" @click="handlePrev" v-if="pageCurrent>1">上一页</li>
      <!-- 当前页码大于1才显示 -->
      <li :class="{thisItem:pageCurrent===1}" @click="handeTab(1)">1</li>
      <li class="disabled" v-if="pageLength > 4 && pageCurrent > 4">...</li>
      <!-- 大于4条数据且当前页大于4才显示 -->
      <li v-for="(item, index) in cycleArr" :key="index"  :class="{thisItem:pageCurrent===item}" @click="handeTab(item)">{{ item }}</li>
      <li class="disabled" v-if="pageLength > 4 && (pageLength-pageCurrent>3)">...</li>
      <!-- 大于4条数据且当前页必最后一页小3才显示 -->
      <li class="next" v-if="pageCurrent<pageLength" @click="handleNext">下一页</li>
      <!-- 小于最后一页才可以显示下一页 -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    total: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 2,
    },
  },
  watch: {
    total: {
      handler(newVal) {
        console.log(newVal);
        this.calPageLength();
      },
    },
  },
  data() {
    return {
      cycleArr: [],
      pageLength: 1,
      pageCurrent:1,
    };
  },
  created() {
    this.pageCurrent=this.currentPage;
    this.calPageLength();
  },
  methods: {
    calPageLength() {
      let pageSize = this.pageSize;
      this.pageLength = Math.ceil((pageSize + this.total) / pageSize) - 1;
      // console.log(this.pageLength+"pageLength");
      this.setCurrentPage();
      this.calcycleArr();
    },
    setCurrentPage(){//设置当前真正的页码
      const pageCurrent=this.pageCurrent;
      const pageLength=this.pageLength;
      this.pageCurrent=pageCurrent>pageLength?pageLength:pageCurrent<1?1:pageCurrent;
      console.log("real"+this.pageCurrent);
    },
    calcycleArr() {//拿到循环列表
      const pageCurrent = this.pageCurrent;
      const pageLength = this.pageLength;//pageLegnt-1是因为默认展示第一页
      this.cycleArr = [];
      let forLength = 4;//默认塞4条数据
      let forStart=1;//默认从1开始
      console.log(pageCurrent);
      console.log(Math.abs(pageCurrent-pageLength));
      const pageInLast=pageLength-pageCurrent;
      if (pageInLast < 2) {
        forLength = 3+pageInLast;
        forStart = pageCurrent-3;
      }else if (pageCurrent > 4){
        forLength = 5;
        forStart = pageCurrent-3;
      }
      console.log(forLength,pageLength);
      for (let i = 0; i < (pageLength-1) && i < forLength; i++) {
        // console.log(i);
        this.cycleArr.push(forStart+i+1);
      }
      console.log(this.cycleArr);
    },
    handlePrev(){//上一页
      this.pageCurrent--;
      this.setCurrentPage();
      this.$emit("current-change",this.pageCurrent);
      this.calcycleArr();
    },
    handeTab(index){//点击当前项
      this.pageCurrent=index;
      this.setCurrentPage();
      this.$emit("current-change",this.pageCurrent);
      this.calcycleArr();
    },
    handleNext(){//上一页
      this.pageCurrent++;
      this.setCurrentPage();
      this.$emit("current-change",this.pageCurrent);
      console.log("zz");
      this.calcycleArr();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.pageNation {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;
}
li {
  list-style: none;
  float: left;
  position: relative;
  padding: 6px 12px;
  line-height: 1.42858;
  text-decoration: none;
  color: #009a61;
  background-color: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.pageNation li:nth-child(n + 2) {
  border-left: none;
}
.pageNation li:first-child {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}
.pageNation li:last-child {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}
li:hover {
  color: #004e31;
  background-color: #eee;
  border-color: #ddd;
}
.pageNation .thisItem{
    color: #fff;
    background-color: #009a61;
    border-color: #009a61;
    cursor: default;
}
.pageNation .disabled{
    color: #777 !important;
    background-color: #fff !important;
    border-color: #ddd !important;
    cursor: not-allowed !important;
}
</style>
