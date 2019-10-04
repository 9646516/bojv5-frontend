import Home from '@/page/Home/Home'
import Announcement from '@/page/Home/AnnouncementDetails'
import AddAnnouncement from '@/page/Home/Add'
import EditAnnouncement from '@/page/Home/Edit'

const Router = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/announcement/:id',
        name: 'Announcement',
        component: Announcement
    }, {
        path: '/addannouncement',
        name: 'AddAnnouncement',
        component: AddAnnouncement,
        meta: {
            NeedStaff: true
        }
    }, {
        path: '/editannouncement/:id',
        name: 'EditAnnouncement',
        component: EditAnnouncement,
        meta: {
            NeedStaff: true
        }
    },
];

export default Router;