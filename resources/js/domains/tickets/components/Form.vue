<template>
    <form @submit.prevent="handleSubmit">
        <label for="title">Titel:</label>
        <input id="title" v-model="form.title" type="text" required />
        <FormError name="title" />

        <label for="content">Beschrijving:</label>
        <input id="content" v-model="form.content" type="text" required />
        <FormError name="content" />

        <label for="category_id">Categorie:</label>
        <select id="category_id" v-model="form.category_id" required>
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.title }}
            </option>
        </select>
        <FormError name="category_id" />
        <button type="submit">Opslaan</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getCategories } from '../../categories/store.js';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';

const props = defineProps({ ticket: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.ticket });
const handleSubmit = () => emit('submit', form.value);

const categories = getCategories;
</script>