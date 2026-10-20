<template>
    <b>Wachtwoord wijzigen</b>
    <ResetPasswordForm :data="data" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { resetPassword } from '../store.js';
import ResetPasswordForm from '../components/ResetPasswordForm.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const data = ref({
    email: route.query.email,
    password: '',
    password_confirmation: '',
    token: route.params.token
});

const handleSubmit = async (data: unknown) => {
    await resetPassword(data);
}
</script>