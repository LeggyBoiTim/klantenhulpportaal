<template>
    <h1><b>Overzicht</b></h1>
    <table>
        <thead>
            <tr>
                <th @click='sortBy("id")'>ID {{ getSortIcon('id') }}</th>
                <th @click='sortBy("name")'>Naam {{ getSortIcon('name') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="category in sortedCategories" :key="category.id">
                <td style="text-align: right;">{{ category.id }}</td>
                <td>{{ category.name }}</td>
                <td><RouterLink :to="{ name: 'categories.edit', params: { id: category.id } }">Bewerk</RouterLink></td>
                <td><button @click="handleDelete(category.id)" style="cursor: pointer;">Verwijder</button></td>
            </tr>
        </tbody>
    </table>
    <ErrorMessage />
    <p><RouterLink to="/categories/create">Nieuwe categorie</RouterLink></p>
</template>

<script setup lang="ts">
import { Category, deleteCategory, fetchAllCategories, getCategories } from '../store';
import { sortTable } from '../../../services/helpers/table';
import ErrorMessage from '../../../ErrorMessage.vue';

fetchAllCategories();

const { sortedItems: sortedCategories, sortBy, getSortIcon } = sortTable<Category>(
    getCategories,
    'id'
);

const handleDelete = async (id: number) => {
    const confirmation = confirm('Weet je zeker dat je deze categorie wilt verwijderen?');
    if (!confirmation) return;
    await deleteCategory(id);
}
</script>