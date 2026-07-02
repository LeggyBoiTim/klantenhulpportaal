import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from '../domains/auth/routes';
import { categoryRoutes } from '../domains/categories/routes';
import { noteRoutes } from '../domains/notes/routes';
import { reactionRoutes } from '../domains/reactions/routes';
import { ticketRoutes } from '../domains/tickets/routes';
import { userRoutes } from '../domains/users/routes';
import { currentUser, me } from '../domains/auth/store';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...authRoutes,
        ...categoryRoutes,
        ...noteRoutes,
        ...reactionRoutes,
        ...ticketRoutes,
        ...userRoutes
    ],
});

router.beforeEach(async (to) => {
    if (!currentUser.value) {
        await me().catch(() => {});
    }

    if (!currentUser.value && to.name !== 'auth.login') {
        return { name: 'auth.login' };
    }

    if (currentUser.value && to.name === 'auth.login') {
        return { name: 'tickets.overview' };
    }

    return;
});