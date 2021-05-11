<template>
  <div class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="discount" v-if="goods.discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other" v-if="goods.colunms && goods.services">
      <span>{{ goods.colunms[0] }}</span>
      <span>{{ goods.colunms[1] }}</span>
      <span>{{ goods.services[goods.services.length-1].name }}</span>
    </div>
    <div class="info-services" v-if="goods.services">
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img v-if="goods.services[index-1].icon" :src="goods.services[index-1].icon" alt="">
        <span>{{ goods.services[index-1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .base-info {
    padding: 15px 10px;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-title {
    color: #222;
  }
  .info-price {
    margin-top: 20px;
  }
  .info-price .n-price {
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price {
    font-size: 13px;
    margin-left: 10px;
    text-decoration: line-through;
  }
  .info-price .discount{
    font-size: 15px;
    background-color: var(--color-high-text);
    color: #fff;
    padding: 5px 10px ;
    border-radius: 5px;
    margin-left: 10px;
  }
  .info-other {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .info-other span {
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .info-services {
    display: flex;
    justify-content: space-between;
  }
  .info-services-item {
    font-size: 10px;
  }
  .info-services-item img{
    width: 12px;
    height: 12px;
  }
</style>
