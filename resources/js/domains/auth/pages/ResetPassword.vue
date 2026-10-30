<template>
    <b>Wachtwoord wijzigen</b>
    <ResetPasswordForm :data="data" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { resetPassword } from '../store.js';
import ResetPasswordForm from '../components/ResetPasswordForm.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const {email, token} = useRoute().params;

const data = ref({
    email: decodeURI(String(email)),
    password: '',
    password_confirmation: '',
    token: token
});

const handleSubmit = async (data: unknown) => {
    await resetPassword(data);
    router.push({ name: 'auth.login' });
}
</script>