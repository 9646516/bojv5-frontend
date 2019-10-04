import Person from '@/page/Ranklist/Person'
import Setting from '@/page/Ranklist/PersonSetting'
import Ranklist from '@/page/Ranklist/Ranklist'

const Router = [
    {
        path: '/user/:id',
        name: 'Person',
        component: Person,
    }, {
        path: '/setting/:id',
        name: 'Setting',
        component: Setting,
        meta: {
            NeedLogin: true
        }
    }, {
        path: '/ranklist/',
        name: 'Ranklist',
        component: Ranklist,
    },
];

export default Router;