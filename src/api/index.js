import request from './request'
import mockRequest from './mockRequest'


export const reqCategoryList = () => request({ url: '/product/getBaseCategoryList', method: 'get' });


export const reqGetBannerList = () => mockRequest({ url: '/banner', method: 'get' })

export const reqGetFloorList = () => mockRequest({ url: `/floor`, method: 'get' })


export const reqSearchList = (data) => request({ url: "/list", method: 'post', data });


export const reqDetailList = (skuId) => request({ url: `/item/${skuId}`, method: 'get' });

export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

export const reqCartList = () => request({ url: '/cart/cartList ', method: 'get' });

export const reqDeleteCartById = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked}   method:get 
export const reqUpdateCheckedByid = (skuId, isChecked) => request({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

export const reqGetCode = (phone) => request({ url: `/user/passport/sendCode/${phone}`, methods: "get" })

export const reqUserRegister = (data) => request({ url: '/user/passport/register', data, method: 'post' });

export const reqUserLogin = (data) => request({ url: '/user/passport/login', data, method: 'post' });


export const reqUserInfo = () => request({ url: '/user/passport/auth/getUserInfo', method: 'get' });

export const reqLogout = () => request({ url: '/user/passport/logout', method: 'get' });

export const reqAddressInfo = () => request({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });


export const reqOrderInfo = () => request({ url: '/order/auth/trade', method: 'get' });

export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });

export const reqPayInfo = (orderId) => request({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });

export const reqPayStatus = (orderId) => request({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' });

export const reqMyOrderList = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' });