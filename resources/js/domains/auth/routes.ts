import Login from './pages/Login.vue';
import Me from './pages/Me.vue';

export const authRoutes =  [
    { path: '/login', component: Login, name: 'auth.login' },
    { path: '/me', component: Me, name: 'auth.me' },
];