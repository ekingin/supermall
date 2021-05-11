<template>
  <div class="DetailNavBar">
    <nav-bar>
      <div slot="left"
           class="back"
           @click="backClick">
        <img src="~assets/img/common/back.svg" alt=""/>
      </div>
      <tab-control slot="center" :titles="titles"></tab-control>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  export default {
    name: "DetailNavBar",
    components: {
      NavBar,
      TabControl
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐']
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back img {
    margin-top: 12px;
  }
</style>
