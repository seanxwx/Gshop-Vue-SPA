<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld/> -->
    <!-- App -->
		<router-view></router-view>
		<FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
// import HelloWorld from './components/HelloWorld'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'

export default {
	name: 'App',
	
	mounted(){
		// this.$store.dispatch('getAddress');
		this.getAddress();
		this.getUserInfo();
	},
	methods: {
		...mapActions(['getAddress', 'getUserInfo'])
	},
  components: {
		// HelloWorld
		FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#app
		width 100%
		height 100%
		background #f5f5f5
</style>
