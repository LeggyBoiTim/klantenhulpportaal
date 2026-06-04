<template>
    <b>Login</b>
    <Form :user="user" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Form from '../components/Form.vue';

const router = useRouter();

const user = ref({
    email: '',
    password: '',
});

const handleSubmit = async (data) => {
    await createAuth(data);
    router.push('/');
}
</script>