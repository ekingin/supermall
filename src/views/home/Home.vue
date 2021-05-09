<template>
  <div id="home">
    <nav-bar class="home-nav" ><div slot="center">购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"/>
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
        isShowBackTop: false
      }
    },
    computed: {
      goodsList() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 获取banners和recommends
      this.getHomeMultiData()
      // 获取商品数据
      this.getHomeGoods('pop', 0)
      this.getHomeGoods('new', 0)
      this.getHomeGoods('sell', 0)

      this.itemImageLoad()

    },
    methods: {
      /**
       * 监听事件的方法
       */
      tabClick(index) {
        // Object.keys(this.goods): ["pop", "new", "sell"]
        this.currentType = Object.keys(this.goods)[index]
      },
      itemImageLoad() {
        // GoodsListItem每加载一张图片都会监听到，拿到scroll组件中的BetterScroll对象，调用其refresh方法
        this.$bus.$on('itemImageLoad', () => {
          this.$refs.scroll.refresh();
        })
      },
      backTopClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
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
      getHomeGoods(type, page) {
        page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    width: 100%;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #f6f6f6;

  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    height: calc(100% - 93px + 44px);
    /*position: absolute;*/
    /*top: 44px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 49px;*/
  }
</style>
