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
	if (to.matched.some(res => res.meta.NeedLogin)||to.matched.some(res => res.meta.NeedStaff)) {
		if (store.getters.isLogin) {
			next()
		} else {
			next({
				name: 'Login',
				params: { text: "Please Login First" }
			})
		}
	} else if (to.matched.some(res => res.meta.NeedNotLogin)) {
		if (!store.getters.isLogin) {
			next()
		} else {
			next({
				name: 'Error',
				params: { text: "You Has Loginned" }
			})
		}
	} else if (to.matched.some(res => res.meta.NeedStaff)) {
		if (store.getters.IsStaff) {
			next()
		} else {
			next({
				name: 'Error',
				params: { text: "You Are Not Staff" }
			})
		}
	} else {
		next()
	}
});

new Vue({
  vuetify,
  router,
	store,
  render: h => h(App)
}).$mount('#app')
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true;