<template>
    <h1><b>Categorie aanmaken</b></h1>
    <Form :category="category" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Category, createCategory } from '../store';
import Form from '../components/Form.vue';
import { New } from '../../../services/store';

const router = useRouter();

const category = ref<New<Category>>({
    name: ''
});

const handleSubmit = async (data: Category) => {
    await createCategory(data);
    router.push({ name: 'categories.overview' });
};
</script>