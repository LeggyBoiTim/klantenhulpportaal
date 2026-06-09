import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";
import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const reactionRoutes =  [
    { path: '/reactions', component: Overview, name: 'reactions.overview' },
    { path: '/reactions/create', component: Create, name: 'reactions.create' },
    { path: '/reactions/:id', component: Show, name: 'reactions.show' },
    { path: '/reactions/:id/edit', component: Edit, name: 'reactions.edit' },
];