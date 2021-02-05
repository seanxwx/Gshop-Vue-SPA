<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper">
				<ul>
					<li class="menu-item" v-for="(good, index) in goods" :key="index"
							:class="{current: index===currentIndex}" @click="clickMenuItem(index)">
						<span class="text bottom-border-1px">
							<img v-if="good.icon" :src="good.icon" class="icon">
							{{good.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper">
				<ul ref="foodsUI">
					<li class="food-list-hook" v-for="(good, index) in goods" :key="index">
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" 
									:key="index" @click="showFood(food)">
								<div class="icon">
									<img width="57" height="57" :src="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">{{food.sellCount}} per month</span>
										<span>Good review {{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">${{food.price}}</span>
										<span class="old" v-if="food.oldPrice">${{food.oldPrice}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<CartControl :food="food"/>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<ShopCart />
		</div>
		<Food	:food="food" ref="food"/>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl'
import Food from '../../../components/Food/Food'
import ShopCart from '../../../components/ShopCart/ShopCart'

export default {
	data(){
		return {
			// currentIndex: ''
			scrollY: 0, //right side Y axis coor(change by sliding)
			tops: [], // array made by all li's top on the right side, not change after list show
			food: {}, //the food needs to be showed
		}
	},
	mounted(){
		this.$store.dispatch('getShopGoods', () => { //excute after data update
			this.$nextTick(()=> { //
				this._initScroll()
				this._initTops()
			})
		})
	},
	computed:{
		...mapState(['goods']),
		currentIndex(){ //init and ralevant data changes
			//get condition data	
			const {scrollY, tops}  = this	

			//calculate and get result based on condition
			const index = tops.findIndex((top, index) => {
				//scrollY >= top &&  scrollY<= next top
				return scrollY >= top && scrollY < tops[index+1]
			})
			//return result
			return index
		}
	},
	methods: {
		//init scroll bar
		_initScroll(){
				//create after list show
				new BScroll('.menu-wrapper', {
					click: true
				})
				this.foodsScroll = new BScroll('.foods-wrapper', {
					probeType: 2, // slide by inertia will not trigger
					click: true
				})

				//give right side list a scroll event watch
				this.foodsScroll.on('scroll', ({x, y}) => {
					console.log(x,y)
					this.scrollY = Math.abs(y)
				})

				this.foodsScroll.on('scrollEnd', ({x, y}) => {
					console.log('scrollEnd', x,y)
					this.scrollY = Math.abs(y)
				})
		},

		_initTops(){
			//init tops
			const tops = []
			let top = 0
			tops.push(top)
			//find all <li> in cate
			const lis = this.$refs.foodsUI.getElementsByClassName('food-list-hook')
			Array.prototype.slice.call(lis).forEach(li => {
				top += li.clientHeight
				tops.push(top)
			})
			//update data
			this.tops = tops
			console.log(tops)
		},
		
		clickMenuItem(index){
			// console.log(index)
			//scroll right list to correct place
			const newY = this.tops[index]
			//uodate scrolly(make clicked cate to be current category)
			this.scrollY = newY
			//smooth slide
			this.foodsScroll.scrollTo(0, -newY, 300)
		},

		//click to show food
		showFood(food){
			//set food
			this.food = food
			//show food's component(use child component's method)
			this.$refs.food.toggleShow()

		}


	},
	components: {
		CartControl,
		Food,
		ShopCart
	},
	watch: {
		
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
