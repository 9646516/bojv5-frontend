import Contest from '@/page/Contest/ContestDetails'
import Contests from '@/page/Contest/ContestList'
import AddContest from '@/page/Contest/Add'
import EditContest from '@/page/Contest/Edit'
import Cover from '@/page/Contest/Details/Cover'
import Dash from '@/page/Contest/Details/Dash'
import Submission from '@/page/Contest/Details/Submission'
import Rank from '@/page/Contest/Details/Rank'
import ProblemDetails from '@/page/Contest/Details/ProblemDetails'
import SubmissionDetails from '@/page/Contest/Details/SubmissionDetails'
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
        path: '/contest/:id/cover',
        name: 'contest_cover',
        component: Cover,
    }, {
        path: '/contest/:id/dash',
        name: 'contest_dash',
        component: Dash,
    }, {
        path: '/contest/:id/submission',
        name: 'contest_submission',
        component: Submission,
    }, {
        path: '/contest/:id/rank',
        name: 'contest_rank',
        component: Rank,
    }, {
        path: '/contest/:id/clari',
        name: 'contest_clari',
        component: Clari,
    },{
        path: '/contest/:id/problem/:uid',
        name: 'contest_problem',
        component: ProblemDetails,
    },{
        path: '/contest/:id/clari/:uid',
        name: 'contest_submission',
        component: SubmissionDetails,
    },
]
export default Router;