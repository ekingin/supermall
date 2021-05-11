import {debounce} from "./utils";

/**
 * 混入的页面有：首页（Home）、商品详情页（detail)
 */
export const imgListenerMixin = {
  data() {
    return {
      imgListener: null,
      refresh: null
    }
  },
  mounted() {
    // 监听商品列表中每个商品图片的加载
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    this.imgListener = () => {
      this.refresh()
    }
    // 对GoodsListItem中发射的事件做监听，执行刷新操作
    this.$bus.$on('itemImageLoad', this.imgListener)
  }
}
