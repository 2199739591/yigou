<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveshow">
        <h2 class="all" @mouseenter="changeshow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click='gosearch'>
              <div class="item" v-for="(item,index) in categoryList" :key="item.categoryId">
                <h3 @mouseenter="changeIndex(index)" :class='{cur:curIndex==index}'>
                  <a :data-categoryName="item.categoryName" :data-category1Id="item.categoryId">{{item.categoryName}}</a>
                </h3>
                <div class="item-list clearfix" :style="{
                    display: curIndex === index ? 'block' : 'none',
                  }">
                  <div class="subitem" v-for="item1 in item.categoryChild" :key="item1.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="item1.categoryName" :data-category2Id="item1.categoryId">{{item1.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="item2 in item1.categoryChild" :key='item2.categoryId'>
                          <a :data-categoryName="item2.categoryName" :data-category3Id="item2.categoryId">{{item2.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>

      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script> 
import {mapState,mapActions} from 'vuex'
import throttle from 'lodash/throttle'
export default {
  data(){
    return {
      curIndex:-1,
      show:true
    }
  },
 

  name:'TypeNav',

  computed:{
    ...mapState('home',['categoryList'])
  },
  methods:{
    gosearch(event){
     let nodeElement = event.target;
      //给a标签添加自定义属性data-categoryName，保证这个节点带data-categoryName，一定是a标签
      //可以通过节点的dataset属性获取相应节点的自定义属性，返回的是一个对象KV【自定义属性相关的】
      //如果带有categoryname字段的一定是a标签
      let { categoryname, category1id, category2id, category3id } =
        nodeElement.dataset;
      //执行if语句：只能区分点击的标签是不是a
      if (categoryname) {
        //准备路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
          //二级分类的a标签
        } else if (category2id) {
          query.category2Id = category2id;
          //三级分类a标签
        } else {
          query.category3Id = category3id;
        }
        //路由跳转之前：看一下有没有params参数，如果有params参数需要携带给search
        if (this.$route.params) {
          //query参数
          location.query = query;
          //params
          location.params = this.$route.params;
          //如有有params参数也需要携带给search模块
          //home->search确实需要记录历史
          //search->search不需要存储历史记录
          if (this.$route.path != "/home") {
            this.$router.replace(location);
          } else {
            this.$router.push(location);
          }
        }
      }
     
    },
    changeshow(){
       if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    leaveshow(){
      this.curIndex=-1
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },

    changeIndex:throttle(function(index){
      this.curIndex=index;
    },100),


  },
  mounted(){
    // this.$store.dispatch('home/getCategory')
    if (this.$route.path != "/home") {
      // console.log(123123);
      this.show = false;
    }
  }
}
</script>

<style lang="less" scoped>
 .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    // .item:hover{
                    //   background-color: skyblue;
                    // }
                }
            }
            .sort-enter {
              height: 0px;
              transform: rotate(0deg);
            }
            //进入状态：结束阶段
            .sort-enter-to {
              height: 461px;
              transform: rotate(360deg);
            }
            //定义过渡动画的时间等等
            .sort-enter-active {
              transition: all 0.2s;
            }
                }
            }

  .cur{
    background-color: skyblue;
  }

</style>