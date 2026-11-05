<template>
    <b>Registreer</b>
    <RegisterForm :user="user" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { createAuth } from '../store.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterForm from '../components/RegisterForm.vue';

const router = useRouter();

const user = ref({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
});

const handleSubmit = async (data: unknown) => {
    await createAuth(data);
    router.push({ name: 'auth.login' });
}
</script>