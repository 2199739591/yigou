<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show='$route.meta.show'></Footer>
  </div>
</template>
<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'

import { mapState } from 'vuex'
export default {
  date(){
    return{

    }
  },
  components:{
    Footer,
    Header
  },
  methods:{

  },
  computed:{
    // ...mapState("search",["searchList"])
  },
  mounted(){
    console.log(this);
    //在根组件渲染出来的时候，向服务器派发action，通过Vuex向服务器发请求，获取三级联动的数据
    //将来给TypeNav（vuex）提供数据
    //写在这里的好处:1,请求只会发一次   2：在typeNav使用数据之前（数据在Vuex中已经存在，且只是向服务器发起一次请求）
    this.$store.dispatch('home/getCategory');
    // this.$store.dispatch('search/getSearchList',{});
  }

}
</script>

<style lang="less">

</style>
