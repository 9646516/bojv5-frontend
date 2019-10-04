import AddProblem from '@/page/Problem/Add'
import Problems from '@/page/Problem/ProblemList'
import Problem from '@/page/Problem/ProblemDetails'
import Files from '@/page/Problem/Files'
import EditProblem from '@/page/Problem/Edit'

const Router = [
    {
        path: '/addproblem',
        name: 'AddProblem',
        component: AddProblem,
        meta: {
            NeedStaff: true
        }
    }, {
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
    }, {
        path: '/files/:id',
        name: 'Files',
        component: Files,
        meta: {
            NeedLogin: true
        }
    }, {
        path: '/editproblem/:id',
        name: 'EditProblem',
        component: EditProblem
    },
];

export default Router;