import ForgotPassword from './pages/ForgotPassword.vue';
import Login from './pages/Login.vue';
import Me from './pages/Me.vue';
import ResetPassword from './pages/ResetPassword.vue';

export const authRoutes =  [
    { path: '/login', component: Login, name: 'auth.login', meta: { guestOnly: true } },
    { path: '/me', component: Me, name: 'auth.me' },
    { path: '/forgot-password', component: ForgotPassword, name: 'auth.forgot-password', meta: { guestOnly: true } },
    { path: '/reset-password/:token', component: ResetPassword, name: 'auth.reset-password', meta: { guestOnly: true } },
];