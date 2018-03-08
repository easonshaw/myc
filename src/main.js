import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import ElementUI from 'element-ui'
import './config/rem'
import FastClick from 'fastclick'
import VueAreaLinkage from 'vue-area-linkage';
import 'babel-polyfill'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

Vue.use(VueAreaLinkage)
Vue.use(VueRouter)
Vue.use(ElementUI)

new Vue({
	router,
	store,
}).$mount('#app')

