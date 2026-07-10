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
                <td><button @click="deleteCategory(category.id)" style="cursor: pointer;">Verwijder</button></td>
            </tr>
        </tbody>
    </table>
    <p><RouterLink to="/categories/create">Nieuwe categorie</RouterLink></p>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { Category, deleteCategory, getCategories } from '../store';

const sortKey = ref('id');
const sortOrder = ref('asc');

const sortedCategories = computed(() => {
    return [...getCategories.value].sort((a, b) => {
        const aVal = a[sortKey.value as keyof Category];
        const bVal = b[sortKey.value as keyof Category];
        if (aVal === null) return sortOrder.value === 'asc' ? -1 : 1;
        if (bVal === null) return sortOrder.value === 'asc' ? -1 : 1;
        if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
    });
});

const sortBy = (key: keyof Category) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
}

const getSortIcon = (key: keyof Category) => {
    if (sortKey.value !== key) return '';
    return sortOrder.value === 'asc' ? '↑' : '↓';
}
</script>