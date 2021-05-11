<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        bscroll: null
      }
    },
    mounted() {
      this.bscroll = new BetterScroll(this.$refs.wrapper, {
        // 手指滚动及惯性动作都会侦测其位置
        probeType: this.probeType,
        // 上拉加载
        pullUpLoad: this.pullUpLoad,
        // 当scroll包裹的子组件中含有div被点击时，默认click:false，即点击不触发事件
        click: true
      })
      if(this.probeType === 2 || this.probeType === 3){
        this.bscroll.on('scroll', position => {
          // 当滚动时，通知父组件
          this.$emit('scroll', position)
        })
      }
      if(this.pullUpLoad) {
        this.bscroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.bscroll && this.bscroll.scrollTo(x, y, time)
      },
      refresh() {
        this.bscroll && this.bscroll.refresh()
      },
      finishPullUp() {
        this.bscroll && this.bscroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
