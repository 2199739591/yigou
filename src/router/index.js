import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '@/views/Home'
const Search = () =>
  import ('@/views/Search')
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import addCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from "@/views/PaySuccess"
import Center from "@/views/Center"
import MyOrder from '@/views/Center/myOrder'
import GroupBuy from '@/views/Center/groupOrder'


import store from '@/store'



Vue.use(VueRouter)


let originPush = VueRouter.prototype.push

let originReplace = VueRouter.prototype.replace;


VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this.location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
  (resolve && reject) ? originReplace.call(this, location, resolve, reject): originReplace.call(this, location, () => {}, () => {});
}





// import routes from './routes.js'
const router = new VueRouter({
  // routes
  routes: [{
      path: '/',
      redirect: '/home',

    },
    {
      path: '/home',
      component: () =>
        import ("@/views/Home"),
      meta: {
        show: true
      }
    },
    {
      name: 'search',
      path: '/search/:keyword',
      component: Search,
      meta: { show: true },

    },
    {
      path: '/login',
      component: Login,
      meta: { show: false }
    }, {
      path: '/register',
      component: Register,
      meta: { show: false }
    },
    {
      path: '/detail/:skuId',
      component: Detail,
      meta: { show: true },
    },
    {
      path: '/addcartsuccess',
      component: addCartSuccess
    },
    {
      path: '/shopcart',
      component: ShopCart
    },
    {
      path: '/trade',
      component: Trade,
      beforeEnter(to, from, next) {
        if (from.path === '/shopcart') {
          next()
        } else {
          next('/shopcart')
        }
      }
    },
    {
      path: '/pay',
      component: Pay,

      // 将query参数映射成props传递给路由组件
      props: route => ({ orderId: route.query.orderId }),

      /* 只能从交易界面, 才能跳转到支付界面 */
      beforeEnter(to, from, next) {
        if (from.path === '/trade') {
          next()
        } else {
          next('/trade')
        }
      }
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      /* 只有从支付界面, 才能跳转到支付成功的界面 */
      beforeEnter(to, from, next) {
        if (from.path === '/pay') {
          next()
        } else {
          next('/pay')
        }
      }
    },
    {
      path: '/center',
      component: Center,
      children: [{
          // path: '/center/myorder',
          path: 'myorder',
          component: MyOrder,
        },
        {
          path: 'groupbuy',
          component: GroupBuy,
        },

        {
          path: '',
          redirect: 'myorder'
        }
      ]
    },

  ],
  scrollBehavior(to, from, savedPosition) {
    //设置Y轴的起点【y属性值没有负数】
    //当然滚动行为也可以设置x轴的
    return { y: 0 }
  }
})

router.beforeEach(async(to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  console.log(token);
  console.log(name);
  // console.log(store.state.user.userInfo);
  // next();

  if (token) {
    if (to.path == '/login' || to.path == '/register') {
      next('/')
    } else {
      if (name) {
        next();
      } else {
        try {
          let result = await store.dispatch("user/getUserInfo")
          console.log(result);
          next();
        } catch (error) {
          // console.log(888);
          // await store.dispatch("user/userLogin")
          await store.dispatch('user/userLogout');
          next('/login')

        }
      }
    }
  } else {
    let toPath = to.path;
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf("/center") != -1) {
      next('login?redirect=' + toPath);
    } else {
      next();
    }
  }
})

export default router