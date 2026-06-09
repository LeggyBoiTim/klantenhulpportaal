<template>
    <form @submit.prevent="handleSubmit">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required/>

        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required/>

        <button type="submit">Login</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';

const props = defineProps({ user: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.user });
const handleSubmit = () => emit('submit', form.value);
</script>