import Me from './components/Me.vue';
import Login from './pages/Login.vue';

export const authRoutes =  [
    { path: '/login', component: Login, name: 'auth.login' },
    { path: '/me', component: Me, name: 'auth.me' },
];