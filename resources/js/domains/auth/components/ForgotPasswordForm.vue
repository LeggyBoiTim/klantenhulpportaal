<template>
    <form @submit.prevent="handleSubmit">
        <label for="email">Stuur link naar e-mail: </label>
        <input type="email" id="email" v-model="form.email" required/>
        <br><br>
        <button type="submit" style="cursor: pointer;">Verstuur link</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';

const props = defineProps({ data: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.data });
const handleSubmit = () => emit('submit', form.value); 
</script>