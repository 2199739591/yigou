import Vue from 'vue'
import App from './App.vue'
import router from './router'
//三级联动全局组件
import store from '@/store';
// Vue.component(TypeNav.name, TypeNav)


import * as API from '@/api';
Vue.config.productionTip = false

import "@/mock/serve"

import Carousel from '@/components/Carousel';
import TypeNav from '@/components/TypeNav';
import Pagination from '@/components/Pagination'
Vue.component(Carousel.name, Carousel);
Vue.component(TypeNav.name, TypeNav);
Vue.component(Pagination.name, Pagination);


import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;





import atm from '@/assets/1.gif';
//引入插件
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm
});

import "@/plugins/validate";






import "./assets/css/swiper.min.css"


new Vue({
  beforeCreate() {
    //配置全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
    //把全部的请求函数：作为Vue.prototype的属性，组件实例可以获取
    //请求函数只需要注册一次，可以在组件当中使用。
  },
  store,
  router,
  render: h => h(App)
}).$mount('#app')