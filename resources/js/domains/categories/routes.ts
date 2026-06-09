import Create from "./pages/Create.vue";
import Edit from "./pages/Edit.vue";
import Overview from "./pages/Overview.vue";
import Show from "./pages/Show.vue";

export const categoryRoutes =  [
    { path: '/categories', component: Overview, name: 'categories.overview' },
    { path: '/categories/create', component: Create, name: 'categories.create' },
    { path: '/categories/:id', component: Show, name: 'categories.show' },
    { path: '/categories/:id/edit', component: Edit, name: 'categories.edit' },
];