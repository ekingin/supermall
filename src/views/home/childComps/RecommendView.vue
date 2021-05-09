<template>
  <div class="recommend-view">
    <div class="recommend-item" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommend-view {
    display: flex;
    width: 100%;
    font-size: 14px;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 8px #f0f0f0 solid;
  }

  .recommend-item img {
    height: 80px;
    width: 80px;
    margin-bottom: 5px;
  }
</style>
