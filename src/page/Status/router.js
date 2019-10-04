import Submission from '@/page/Status/Submission'
import Status from '@/page/Status/StatusList'


const Router = [
    {
        path: '/submission/:id',
        name: 'Submission',
        component: Submission,
        meta: {
            NeedLogin: true
        }
    }, {
        path: '/status',
        name: 'Status',
        component: Status,
        meta: {
            NeedLogin: true
        }
    },
];

export default Router;