/*
object which using indirect methods using mutations to update state 
*/
import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORIES,
	RECEIVE_SHOPS,
	RECEIVE_USER_INFO,
	RESET_USER_INFO,
	RECEIVE_GOODS,
	RECEIVE_RATINGS,
	RECEIVE_INFO,
	INCREMENT_FOOD_COUNT,
	DECREMENT_FOOD_COUNT,
	CLEAR_CART
} from './mutation-types';

import {
	reqAddress,
	reqFoodCategories,
	// reqSearchShopLists,
	reqShops,
	reqUserInfo,
	reqLogout,
	reqShopGoods,
	reqShopRatings,
	reqShopInfo
} from '../api';
import { call } from 'file-loader';


export default{
	//async get address
	async getAddress({commit, state}){
		const geohash = state.latitude + ',' + state.longitude;
		const result = await reqAddress(geohash)
		//send a mutation
		if(result.code === 0){
			const address = result.data
			console.log(address);
			commit(RECEIVE_ADDRESS, {address})
			
		}
	},
	//async get food categories
	async getCategories({commit}){
		const result = await reqFoodCategories()
		//send a mutation
		if(result.code === 0){
			const categories = result.data
			commit(RECEIVE_CATEGORIES, {categories})
		}
	},
	//async get shops
	async getShops({commit, state}){
		const {longitute, latitude} = state
		const result = await reqShops(longitute, latitude)
		//send a mutation
		if(result.code === 0){
			const shops = result.data
			commit(RECEIVE_SHOPS, {shops})
		}
	},

	//sync save user info
	recordUser({commit}, userInfo){
		commit(RECEIVE_USER_INFO, {userInfo})
	},

	//async get user info
	async getUserInfo({commit}){
		const result = await reqUserInfo()
			if(result.code ===0){
				const userInfo = result.data
				commit(RECEIVE_USER_INFO, {userInfo})
		}
	},

	//async logout
	async logout({commit}){
		const result = await reqLogout()
			if(result.code === 0){
				commit(RESET_USER_INFO)
		}
	},

	async getShopInfo({commit}){
		const result = await reqShopInfo()
			if(result.code === 0){
				const info = result.data
				commit(RECEIVE_INFO, {info})
		}
	},

	async getShopRatings({commit}, callback){
		const result = await reqShopRatings()
			if(result.code === 0){
				const ratings = result.data
				commit(RECEIVE_RATINGS, {ratings})
				callback && callback()
		}
	},

	async getShopGoods({commit}, callback){
		const result = await reqShopGoods()
			if(result.code === 0){
				const goods = result.data
				commit(RECEIVE_GOODS, {goods})
				// once data updated, notify the component
				callback && callback()
		}
	},

	//sync update the count value in food
	updateFoodCount({commit}, {isAdd, food}){
		if(isAdd) {
			commit(INCREMENT_FOOD_COUNT, {food})
		}else {
			commit(DECREMENT_FOOD_COUNT, {food})
		}
	},

	//sync clean the shopping cart
	clearCart({commit}){
		commit(CLEAR_CART)
	}

}