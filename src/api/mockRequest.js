import axios from 'axios'

import nprogress from 'nprogress';
//因为进度条样式咱们没有引入
import "nprogress/nprogress.css";
const instance = axios.create({
  baseURL: '/mock',
  timeout: 5000
})


instance.interceptors.request.use((config) => {
  //现在的问题是config是什么?配置对象
  //可以让进度条开始动
  // if (store.state.detail.uuid_token) {
  //   //请求头添加一个字段(userTempId):和后台老师商量好了
  //   config.headers.userTempId = store.state.detail.uuid_token;
  // }
  // //需要携带token带给服务器
  // if (store.state.user.token) {
  //   config.headers.token = store.state.user.token;
  // }
  nprogress.start();
  return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
instance.interceptors.response.use(
  (res) => {
    //进度条结束
    nprogress.done();
    //相应成功做的事情
    return res.data;
  },
  (err) => {
    alert("服务器响应数据失败");
  }
);




export default instance