// module contains multiple api request
//return value: promise object

import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'


// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategories = () => ajax(`${BASE_URL}/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => ajax(BASE_URL+'shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShopLists = (geohash, keyword) => ajax('search_shops', {geohash, keyword})
// 5、获取一次性验证码
export const reqCaptcha = () => ajax(`/captcha`)
// 6、用户名密码登陆
export const reqLogin = (name, pwd, captcha) => ajax('/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendSMSCode = (phone) => ajax(`/captcha`, {phone})
// 8、手机号验证码登陆
export const reqLoginBySMS = (phone, code) => ajax(`/login_sms`, {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(`/userinfo`)
// 10、用户登出
export const reqLogout = () => ajax(`/logout`)