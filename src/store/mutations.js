/*
object which using multiple methods to direct update state 
*/
import Vue from 'vue'
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

export default{
	[RECEIVE_ADDRESS] (state, {address}){
		state.address = address
	},
	[RECEIVE_CATEGORIES] (state, {categories}){
		state.categories = categories
	},
	[RECEIVE_SHOPS] (state, {shops}){
		state.shops = shops
	},
	[RECEIVE_USER_INFO] (state, {userInfo}){
		state.userInfo = userInfo
	},
	[RESET_USER_INFO] (state){
		state.userInfo = {}
	},
	[RECEIVE_GOODS] (state, {goods}){
		state.goods = goods
	},
	[RECEIVE_RATINGS] (state, {ratings}){
		state.ratings = ratings
	},
	[RECEIVE_INFO] (state, {info}){
		state.info = info
	},
	[INCREMENT_FOOD_COUNT] (state, {food}){
		if(!food.count) { //first time
			// food.count = 1
			/*
			object
			element name
			element value
			*/
			Vue.set(food, 'count', 1)//make new element also has data binding
			//add food into cartFoods
			state.cartFoods.push(food)
		}else{
			food.count++
		}
	},
	[DECREMENT_FOOD_COUNT] (state, {food}){
		if(food.count){
			food.count--
			if(food.count==0){
				//remove food from cartFoods
				state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
			}
		}
	}, 

	[CLEAR_CART] (state){
		//clear food's count
		state.cartFoods.forEach(food => food.count = 0)
		//remove items from shopping cart
		state.cartFoods = []
	}
	
}