<template>
  <div id="home">
    <nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="goodsList" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop"

  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import {getHomeMultiData, getHomeGoods} from "../../network/home"
  import {imgListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop
    },
    computed: {
      // 根据当前商品类型计算出相应list
      goodsList() {
        return this.goods[this.currentType].list
      }
    },
    mixins: [imgListenerMixin],
    methods: {
      /**
       * 监听事件的方法
       */
      tabClick(index) {
        // Object.keys(this.goods): ["pop", "new", "sell"]
        this.currentType = Object.keys(this.goods)[index]
        // 保证两个tab-control的选项一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        // 判断back-top是否显示
        this.isShowBackTop = (-position.y) > 1000
        // 判断tab-control是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },
      swiperImgLoad() {
        // 当home-swiper图片加载完成时，记录此时的tab-control的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       * 获取网络请求的方法
       */
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // 数组中push另一个数组的所有元素，使用可变参数的形式
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    created() {
      // 获取banners和recommends
      this.getHomeMultiData()
      // 获取商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
    },
    deactivated() {
      // 当Home页面不活跃的时候，取消总线监听
      this.$bus.$off('itemImageLoad', this.imgListener)
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;

    /*position: fixed;*/
    /*left: 0;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;
    height: calc(100% - 93px);

    /*position: absolute;*/
    /*top: 44px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 49px;*/
  }

</style>
