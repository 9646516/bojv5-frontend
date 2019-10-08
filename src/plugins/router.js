import Vue from 'vue'
import Router from 'vue-router'
import Class from '@/page/Class/router.js'
import Contest from '@/page/Contest/router.js'
import Home from '@/page/Home/router.js'
import Others from '@/page/Others/router.js'
import Problem from '@/page/Problem/router.js'
import Ranklist from '@/page/Ranklist/router.js'
import Status from '@/page/Status/router.js'


Vue.use(Router)

export default new Router({
  routes: [
    ...Class,
    ...Contest,
    ...Home,
    ...Others,
    ...Problem,
    ...Ranklist,
    ...Status,
  ]
})