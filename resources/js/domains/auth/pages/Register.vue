<template>
    <b>Registreer</b>
    <RegisterForm :user="user" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { registerUser } from '../store.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RegisterForm from '../components/RegisterForm.vue';
import { User } from '../../users/store.js';

const router = useRouter();

const user = ref({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    role: 'user',
});

const handleSubmit = async (data: User) => {
    await registerUser(data);
    router.push({ name: 'auth.login' });
}
</script>