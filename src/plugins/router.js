import Vue from 'vue'
import Router from 'vue-router'
import Setting from '@/page/Ranklist/PersonSetting'
import About from '@/page/About'
import Add from '@/page/Add'
import Home from '@/page/Home/Home'
import Problems from '@/page/Problem/ProblemList'
import Logout from '@/page/Logout'
import Problem from '@/page/Problem/ProblemDetails'
import Announcement from '@/page/Home/AnnouncementDetails'
import Error from '@/page/Error'
import Edit from '@/page/Edit'
import Register from '@/page/Register'
import Submission from '@/page/Status/Submission'
import Status from '@/page/Status/StatusList'
import Person from '@/page/Ranklist/Person'
import Contest from '@/page/Contest/ContestDetails'
import Contests from '@/page/Contest/ContestList'
import Ranklist from '@/page/Ranklist/Ranklist'
import AddUser from '@/page/AddUser'
import ClassList from '@/page/Class/ClassList'
import Dev from '@/page/Dev'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/dev',
    name: 'Dev',
    component: Dev,
  }, {
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/setting/:id',
    name: 'Setting',
    component: Setting,
    meta: {
      NeedLogin: true
    }
  }, {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: {
      NeedStaff: true
    }
  },
  {
    path: '/problems',
    name: 'Problems',
    component: Problems,
    meta: {
      NeedStaff: true
    }
  },
  {
    path: '/problem/:id',
    name: 'Problem',
    component: Problem,
    meta: {
      NeedStaff: true
    }
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  }, {
    path: '/announcement/:id',
    name: 'Announcement',
    component: Announcement
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/status',
    name: 'Status',
    component: Status,
    meta: {
      NeedLogin: true
    }
  },
  {
    path: '/submission/:id',
    name: 'Submission',
    component: Submission,
    meta: {
      NeedLogin: true
    }
  },
  {
    path: '/contests/',
    name: 'Contests',
    component: Contests,
  }, {
    path: '/contest/:id',
    name: 'Contest',
    component: Contest,
  }, {
    path: '/ranklist/',
    name: 'Ranklist',
    component: Ranklist,
  }, {
    path: '/user/:id',
    name: 'Person',
    component: Person,
  }, {
    path: '/adduser',
    name: 'AddUser',
    component: AddUser,
    meta: {
      NeedStaff: true
    }
  }, {
    path: '/classlist',
    name: 'ClassList',
    component: ClassList,
    meta: {
      NeedLogin: true
    }
  },
  ]
})