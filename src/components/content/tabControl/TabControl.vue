<template>
  <div class="tab-control">
    <div class="tab-control-item"
         v-for="(item, index) in titles"
         :class="{ active: currentIndex === index }"
         @click="itemClick(index)">
      <span >{{ item }}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      if(this.$route.path.indexOf('/home') !== -1){
        // 给首页发射父子事件
        this.$emit('tabClick', index)
      }else if(this.$route.path.indexOf('detail') !== -1){
        // 给详情页发射总线事件
        this.$bus.$emit('detailTabControl', index)
      }
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;

  }

  .active {
    color: var(--color-high-text);
  }

  .active span{
    padding: 3px;
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
