import About from '@/page/Others/About'
import Logout from '@/page/Others/Logout'
import Error from '@/page/Others/Error'
import Register from '@/page/Others/Register'
import AddUser from '@/page/Others/AddUser'
import Dev from '@/page/Others/Dev'


const Router = [
    {
        path: '/dev',
        name: 'Dev',
        component: Dev,
    },
    {
        path: '/about',
        name: 'About',
        component: About
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
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/adduser',
        name: 'AddUser',
        component: AddUser,
        meta: {
            NeedStaff: true
        }
    },
];

export default Router;