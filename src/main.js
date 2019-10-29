import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import router from '@/plugins/router.js';
import store from '@/plugins/store.js';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
router.beforeEach((to, from, next) => {
	if (to.matched.some(res => res.meta.NeedLogin) || to.matched.some(res => res.meta.NeedStaff)) {
		if (store.getters.isLogin) {
			next()
		} else {
			next({
				name: 'Logout'
			})
		}
	} else if (to.matched.some(res => res.meta.NeedStaff)) {
		if (store.getters.IsStaff) {
			next()
		} else {
			next({
				name: 'Error',
				params: {
					text: "You Are Not Staff"
				}
			})
		}
	} else {
		next()
	}
});

function test() {
	if (!store.getters.Refresh_Token) {
		return true;
	}
	let token = store.getters.Refresh_Token.split('.')[1];
	let Decrypted = JSON.parse(window.atob(token)).exp;
	let CurrentTime = new Date().getTime() / 1000;
	return Decrypted - 600 > CurrentTime;
}

function test2() {
	if (!store.getters.Token) {
		return true;
	}
	let token = store.getters.Token.split('.')[1];
	let Decrypted = JSON.parse(window.atob(token)).exp;
	let CurrentTime = new Date().getTime() / 1000;
	console.log(Decrypted, CurrentTime);
	return Decrypted - 600 > CurrentTime;
}
var BASE_URL = "http://10.105.242.94:23336/"
axios.interceptors.response.use(
	function (config) {
		config.url = BASE_URL + config.url
		return config;
	}
)
axios.interceptors.request.use(
	function (config) {
		config.url = BASE_URL + config.url
		if (!test()) {
			router.push({
				name: 'Error',
				params: {
					text: "Please ReLogin"
				}
			})
		} else if (!test2()) {
			store.dispatch("Del_Token");
			axios.get(
				"v1/user-token", {
					headers: {
						Authorization: "Bearer " + store.getters.Refresh_Token
					}
				}
			).then(res => {
				console.log(res);
				if (res.data.code === 0) {
					store.dispatch("Update_Token", res.data.token);
				} else {
					router.push({
						name: 'Error',
						params: {
							text: "ERR"
						}
					})
				}
			});
		}
		return config;
	}
)

new Vue({
	vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
Vue.prototype.$ajax = axios;
Vue.prototype.$axios = axios
import "highlight.js/styles/xcode.css"
import animated from 'animate.css'
Vue.use(animated)