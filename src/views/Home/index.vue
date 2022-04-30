<template>
  <div>
    <!-- 主页 -->
    <TypeNav></TypeNav>
    <List-container></List-container>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floorInfo="floor"></Floor>
    <!-- <Floor></Floor>
    <Floor></Floor> -->
    <Brand></Brand>
    <!-- <h1>{{count}}</h1>
    <!-- <button @click="aoo">点击加1</button> -->
    <!-- <button @click="add">点击甲乙</button> --> -->
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav'
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

import {mapState,mapMutations} from 'vuex';
export default {
  components:{
    TypeNav,
    ListContainer,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  methods:{
    // aoo(){
    //   this.$store.commit('jia')
    //   // console.log(123);
    // }
      
    // }
    ...mapMutations('home',{add:'jia'}),
    
    
   
  },
  computed:{
    // ...mapState('home',['count']),
    ...mapState("home",["floorList"])

  },
  mounted() {
    this.$store.dispatch("home/getFloorList")
    // this.$store.dispatch("user/getUserInfo")
	}

}
</script>

<style>

</style>