/*
contains multiple getter calculate element based on state 

*/
export default{
	
	totalCount(state) {
		return state.cartFoods.reduce((prevTotal, food) => prevTotal + food.count, 0 )
	},

	totalPrice(state) {
		return state.cartFoods.reduce((prevTotal, food) => prevTotal + food.count * food.price, 0 )
	},
}