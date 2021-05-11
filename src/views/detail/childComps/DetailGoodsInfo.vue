<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list"
           :key="index"
           :src="item"
           @load="detailImgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    methods: {
      detailImgLoad() {
        this.$emit('detailImgLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 10px;
    width: 100vw;
  }
  .info-desc {
    font-size: 14px;
  }
  .info-key {
    margin-top: 20px;
    font-size: 16px;
  }
  .info-list img {
    width: 100%
  }
</style>
