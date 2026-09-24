import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const noteRoutes =  [
    { path: '/notes', component: Overview, name: 'notes.overview', meta: { requiresAdmin: true } },
    { path: '/notes/:id', component: Show, name: 'notes.show', meta: { requiresAdmin: true } },
];