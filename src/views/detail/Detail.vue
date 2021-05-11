<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @detailImgLoad="detailImgLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import {getDetial, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {imgListenerMixin} from "common/mixin";
  import {debounce} from "common/utils";

  export default {
    name: "Detail",
    components: {
      Scroll,
      GoodsList,
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo
    },
    mixins: [imgListenerMixin],
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null
      }
    },
    created() {
      // 获取详情页ID
      this.iid = this.$route.params.iid

      // 获取详情页数据
      getDetial(this.iid).then(res => {
        const data = res.result
        // 获取详情页轮播图数据
        this.topImages = data.itemInfo.topImages
        // 获取详情页商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详情信息
        this.detailInfo = data.detailInfo
        // 获取商品参数
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      // 获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      // 生成获取子组件的offsetTop的函数，并做了防抖处理
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
      }, 500)
    },
    mounted() {
      // 对DetailNavBar中tab-control组件做总线监听
      this.$bus.$on('detailTabControl', index => {
        if(this.$refs.scroll)
          this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
      })
    },
    destroyed() {
      // 当详情页销毁时，关闭总线上的事件监听
      this.$bus.$off('itemImageLoad', this.imgListener)
    },
    methods: {
      detailImgLoad() {
        // 调用mixin.js中的refresh属性
        this.refresh();
        // 获取子组件offsetTop
        this.getThemeTopY()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>
