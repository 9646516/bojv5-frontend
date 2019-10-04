import Contest from '@/page/Contest/ContestDetails'
import Contests from '@/page/Contest/ContestList'
import AddContest from '@/page/Contest/Add'
import EditContest from '@/page/Contest/Edit'
const Router = [
    {
        path: '/addcontest',
        name: 'AddContest',
        component: AddContest,
        meta: {
            NeedStaff: true
        }
    },
    {
        path: '/editcontest/:id',
        name: 'EditContest',
        component: EditContest,
        meta: {
            NeedLogin: true
        }
    }, {
        path: '/contests/',
        name: 'Contests',
        component: Contests,
        meta: {
            NeedLogin: true
        }
    }, {
        path: '/contest/:id',
        name: 'Contest',
        component: Contest,
        meta: {
            NeedLogin: true
        }
    },
];

export default Router;