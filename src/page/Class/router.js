import ClassList from '@/page/Class/ClassList'
import ClassDetails from '@/page/Class/ClassDetails'
import EditClass from '@/page/Class/Edit'
import AddClass from '@/page/Class/Add'
import ClassAddMember from '@/page/Class/AddMember'
const Router = [
    {
        path: '/addclass',
        name: 'AddClass',
        component: AddClass,
        meta: {
            NeedStaff: true
        }
    }, {
        path: '/classaddmember/:id',
        name: 'ClassAddMember',
        component: ClassAddMember,
        meta: {
            NeedStaff: true
        }
    }, {
        path: '/classdetails/:id',
        name: 'ClassDetails',
        component: ClassDetails,
    }, {
        path: '/editclass/:id',
        name: 'EditClass',
        component: EditClass,
        meta: {
            NeedLogin: true
        }
    }, {
        path: '/classlist',
        name: 'ClassList',
        component: ClassList,
        meta: {
            NeedLogin: true
        }
    },
];

export default Router;