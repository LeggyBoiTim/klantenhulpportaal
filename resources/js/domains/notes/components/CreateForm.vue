<template>
    <form @submit.prevent="handleSubmit">
        <label for="content"><i>Nieuwe notitie:</i></label><br>
        <input id="content" v-model="form.content" type="text" required />
        <FormError name="content" /><br>

        <button type="submit" style="cursor: pointer;">Plaats notitie</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';

const props = defineProps({ note: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.note });
const handleSubmit = () => emit('submit', form.value);
</script>