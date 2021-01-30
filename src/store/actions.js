/*
object which using indirect methods using mutations to update state 
*/
import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORIES,
	RECEIVE_SHOPS
} from './mutation-types';

import {
	reqAddress,
	reqFoodCategories,
	// reqSearchShopLists,
	reqShops
} from '../api';


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
	}
}