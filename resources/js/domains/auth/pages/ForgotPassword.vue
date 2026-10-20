<template>
    <b>Wachtwoord vergeten</b>
    <ForgotPasswordForm :data="data" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { forgotPassword } from '../store.js';
import { ref } from 'vue';
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue';

const data = ref({
    email: '',
});

const handleSubmit = async (data: unknown) => {
    await forgotPassword(data);
}
</script>