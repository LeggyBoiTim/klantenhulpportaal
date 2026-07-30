import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";
import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const noteRoutes =  [
    { path: '/notes', component: Overview, name: 'notes.overview', meta: { requiresAdmin: true } },
    { path: '/notes/create', component: Create, name: 'notes.create', meta: { requiresAdmin: true } },
    { path: '/notes/:id', component: Show, name: 'notes.show', meta: { requiresAdmin: true } },
    { path: '/notes/:id/edit', component: Edit, name: 'notes.edit', meta: { requiresAdmin: true } },
];