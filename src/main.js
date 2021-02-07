// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'
import App from './App'
import router from './router'
import store from './store'
import loading from './common/imgs/loading.gif'
import './mock/mockServer'
import './filters' // loaz filters
// Vue.config.productionTip = false
Vue.component(Button.name, Button) //<mt-button>
/* eslint-disable no-new */
//custom assign a Lazy order
Vue.use(VueLazyLoad, {
	loading: loading,
})

new Vue({
	el: '#app',
	// components: { App },
	// template: '<App/>'
	render: h => h(App),
	router, //use vue-router
	store // use vuex
})
