import TheMain from './components/TheMain.vue';
import TheLogin from './components/TheLogin.vue';
import OverView from './views/OverView.vue';
import ChangePassword from './views/ChangePassword.vue';
import StudentInformation from './views/StudentInformation.vue';
import ScoreLookup from './views/ScoreLookup.vue';
import SchoolYear from './views/schoolyear/SchoolYear.vue';
import Semester from './views/semester/Semester.vue';
import Subject from './views/subject/Subject.vue';
import Decentralization from './views/decentralization/Decentralization.vue';
import Class from './views/class/Class.vue';
import User from './views/user/User.vue';
import Student from './views/student/Student.vue';
import StudentClass from './views/studentclass/StudentClass.vue';
import StudentSubject from './views/studentsubject/StudentSubject.vue';
import DetailedTableScore from './views/detailedtablescore/DetailedTableScore.vue';
import VueRouter from 'vue-router';
const routes = [{
        path: '/',
        redirect: '/login'
    },
    { path: '/login', component: TheLogin },
    {
        path: '/main',
        component: TheMain,
        redirect: '/overview',
        children: [
            { path: '/overview', component: OverView },
            { path: '/studentinformation', component: StudentInformation },
            { path: '/changepassword', component: ChangePassword },
            { path: '/scorelookup', component: ScoreLookup },
            { path: '/schoolyear', component: SchoolYear },
            { path: '/semester', component: Semester },
            { path: '/subject', component: Subject },
            { path: '/decentralization', component: Decentralization },
            { path: '/class', component: Class },
            { path: '/user', component: User },
            { path: '/student', component: Student },
            { path: '/studentclass', component: StudentClass },
            { path: '/studentsubject', component: StudentSubject },
            { path: '/detailedtablescore', component: DetailedTableScore },
        ]
    },
]


export default new VueRouter({
    mode: 'history',
    routes
})