import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";
import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const userRoutes =  [
    { path: '/users', component: Overview, name: 'users.overview' },
    { path: '/users/create', component: Create, name: 'users.create' },
    { path: '/users/:id', component: Show, name: 'users.show' },
    { path: '/users/:id/edit', component: Edit, name: 'users.edit' },
];