<template>
    <b>Login</b>
    <LoginForm :user="user" @submit="handleSubmit" />
    <br>
    <RouterLink to="/forgot-password">Wachtwoord vergeten?</RouterLink>
</template>

<script setup lang="ts">
import { createAuth } from '../store.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';

const router = useRouter();

const user = ref({
    email: '',
    password: '',
});

const handleSubmit = async (data: unknown) => {
    await createAuth(data);
    router.push({ name: 'tickets.overview' });
}
</script>