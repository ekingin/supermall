<template>
  <div>
    <div class="top">1111111111</div>
    <div class="wrapper">
      <div class="content">
        <div class="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list" ref="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list">列表1</div>
        <div class="list">列表1</div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Category",
    mounted() {
      const scroll = new BScroll('.wrapper', {
        probeType: 3
      })

    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
    height: 200px;
    background-color: red;
  }
  .list{
    height: 40px;
  }
  .top{
    height: 300px;
    background-color: blue;
  }
</style>
