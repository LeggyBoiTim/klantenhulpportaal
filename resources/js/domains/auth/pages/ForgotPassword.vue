<template>
    <b>Wachtwoord vergeten</b>
    <ForgotPasswordForm :data="data" @submit="handleSubmit" />
    <br>
    <p v-if="submitted" style="color: red;">Link verstuurd!</p>
</template>

<script setup lang="ts">
import { forgotPassword } from '../store.js';
import { ref } from 'vue';
import ForgotPasswordForm from '../components/ForgotPasswordForm.vue';

const data = ref({
    email: '',
});

const submitted = ref(false);

const handleSubmit = async (data: unknown) => {
    await forgotPassword(data);
    submitted.value = true;
}
</script>