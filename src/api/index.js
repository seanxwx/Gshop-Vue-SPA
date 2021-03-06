// module contains multiple api request
//return value: promise object

import ajax from './ajax'
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'

//token: ecedc31ba6284c56805be865df92ddb5
// 1、根据经纬度获取位置详情
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodCategories = () => ajax(`${BASE_URL}/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude,latitude) => ajax(BASE_URL + '/shops', {longitude, latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShops = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})
// 5、获取一次性验证码
// export cons t reqCaptcha = () => ajax(`/captcha`)
// 6、用户名密码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')
// 7、发送短信验证码
export const reqSendCode = (phone) => ajax(BASE_URL + '/sendcode', {phone})
// 8、手机号验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms' , {phone, code}, 'POST')
// 9、根据会话获取用户信息
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
// 10、用户登出
export const reqLogout = () => ajax(BASE_URL + '/logout')

//get goods
export const reqShopInfo = () => ajax('/info')
//get ratings
export const reqShopRatings = () => ajax('/ratings')
//get info
export const reqShopGoods = () => ajax('/goods')

