<template>
     <section class="msite">
        <!--Main Header-->
				<HeaderTop :title="address.name">
					<span class="header_search" slot="left">
            <i class="iconfont icon-sousuo"></i>
          </span>
					<span class="header_login" slot="right">
            <span class="header_login_text">Login|Register</span>
          </span>
				</HeaderTop>	
        <!--Mian Navi-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categories.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categories, index) in categoriesArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(category, index) in categories" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl + category.image_url">
                  </div>
                  <span>{{category.title}}</span>
                </a>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
					<img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">Recent Shops</span>
          </div>
          <ShopList />
        </div>
      </section>
</template>

<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'

export default {
	data(){
		return {
			baseImageUrl: 'https://fuss10.elemecdn.com'
		}
	},
	mounted(){

		this.$store.dispatch('getCategories');
		this.$store.dispatch('getShops');
	},

	computed: {
		...mapState(['address', 'categories']),
		/*
		base on categories one demensional arrary, generate a 2-demensional array
		max items in small array is 8
		*/
		categoriesArr(){
			const {categories} = this
			//prepare empty 2-d array
			const arr = []
			//prepare small array(max length is 8 )
			let minArr = []
			// foreach categories
			categories.forEach(c => {
				//if minArray is fiull, create a new array
				if(minArr.length === 8){
					minArr = []
				}
				//if minArray is empty, save it to Array
				if(minArr.length === 0){
					arr.push(minArr)
				}
				//save current category in minArr
				minArr.push(c)
				
			})

			return arr
		}
	},

	watch: {
		categories(value){ //once value exists in categories, excute before interfacae get async updated
			// 1. use setTimeout	
			// setTimeout(() => {
			// 	new Swiper('.swiper-container',{
			// 		loop:	true,
			// 		pagination: {
			// 			el: '.swiper-pagination'
			// 		}
			// 	})
			// }, 1000);
			
			//Once interface update, create Swiper Object
			this.$nextTick(() => { 
				new Swiper('.swiper-container',{
					loop:	true,
					pagination: {
						el: '.swiper-pagination'
					},
				})
			})
		}
	},

	components: {
		HeaderTop,
		ShopList
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl"
	.msite  //首页
		width 100%
	.msite_nav
		bottom-border-1px(#e4e4e4)
		margin-top 45px
		height 200px
		background #fff
		.swiper-container
			width 100%
			height 100%
			.swiper-wrapper
				width 100%
				height 100%
				.swiper-slide
					display flex
					justify-content center
					align-items flex-start
					flex-wrap wrap
					.link_to_food
						width 25%
						.food_container
							display block
							width 100%
							text-align center
							padding-bottom 10px
							font-size 0
							img
								display inline-block
								width 50px
								height 50px
						span
							display block
							width 100%
							text-align center
							font-size 13px
							color #666
			.swiper-pagination
				>span.swiper-pagination-bullet-active
					background #02a774
	.msite_shop_list
		top-border-1px(#e4e4e4)
		margin-top 10px
		background #fff
		.shop_header
			padding 10px 10px 0
			.shop_icon
				margin-left 5px
				color #999
			.shop_header_title
				color #999
				font-size 14px
				line-height 20px
		
</style>
