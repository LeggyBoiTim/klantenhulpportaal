<template>
    <h1><b>Categorie wijzigen</b></h1>
    <Form :category="category" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Category, getCategoryById, updateCategory } from '../store';
import Form from '../components/Form.vue';
import { Updatable } from '../../../services/store';

const route = useRoute()
const router = useRouter();

const category = ref<Updatable<Category>>(getCategoryById(Number(route.params.id)).value);

const handleSubmit = async (data: Category) => {
    await updateCategory(Number(route.params.id), data);
    router.push({ name: 'categories.overview' });
};
</script>