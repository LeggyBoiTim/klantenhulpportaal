<template>
    <form @submit.prevent="handleSubmit">
        <input type="hidden" id="email" v-model="form.email">

        <label for="password">Wachtwoord: </label>
        <input type="password" id="password" v-model="form.password" required/><br>

        <label for="password_confirmation">Wachtwoord herhalen: </label>
        <input type="password" id="password_confirmation" v-model="form.password_confirmation" required/>

        <input type="hidden" id="token" v-model="form.token">

        <br><br>
        <button type="submit" style="cursor: pointer;">Wijzig wachtwoord</button>
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