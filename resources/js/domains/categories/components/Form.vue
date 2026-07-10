<template>
    <form @submit.prevent="handleSubmit">
        <label for="name">Naam:</label>
        <input id="name" v-model="form.name" type="text" required />
        <FormError name="name" />

        <button type="submit">Opslaan</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';

const props = defineProps({ category: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.category });
const handleSubmit = () => emit('submit', form.value);
</script>