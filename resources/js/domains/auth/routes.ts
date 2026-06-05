import Home from './pages/Home.vue';
import Login from './pages/Login.vue';

export const authRoutes =  [
    { path: '/home', component: Home, name: 'auth.home' },
    { path: '/login', component: Login, name: 'auth.login' },
];