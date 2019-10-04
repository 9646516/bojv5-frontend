import About from '@/page/Ohers/About'
import Logout from '@/page/Ohers/Logout'
import Error from '@/page/Ohers/Error'
import Register from '@/page/Ohers/Register'
import AddUser from '@/page/Ohers/AddUser'
import Dev from '@/page/Ohers/Dev'


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