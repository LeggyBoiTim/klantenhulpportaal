import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from '../domains/auth/routes';
import { categoryRoutes } from '../domains/categories/routes';
import { noteRoutes } from '../domains/notes/routes';
import { reactionRoutes } from '../domains/reactions/routes';
import { ticketRoutes } from '../domains/tickets/routes';
import { userRoutes } from '../domains/users/routes';

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