<template>
    <b>Wachtwoord vergeten</b>
    <ForgotPasswordForm :user="user" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { forgotPassword } from '../store.js';
import { ref } from 'vue';
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue';
import { User } from '../../users/store.js';

const user = ref({
    email: '',
});

const handleSubmit = async (data: User) => {
    await forgotPassword(data);
}
</script>