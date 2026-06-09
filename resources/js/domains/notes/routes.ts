import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";
import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const noteRoutes =  [
    { path: '/notes', component: Overview, name: 'notes.overview' },
    { path: '/notes/create', component: Create, name: 'notes.create' },
    { path: '/notes/:id', component: Show, name: 'notes.show' },
    { path: '/notes/:id/edit', component: Edit, name: 'notes.edit' },
];