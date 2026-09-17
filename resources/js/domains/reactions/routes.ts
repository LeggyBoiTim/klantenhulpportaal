import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const reactionRoutes =  [
    { path: '/reactions', component: Overview, name: 'reactions.overview' },
    { path: '/reactions/:id', component: Show, name: 'reactions.show' },
];