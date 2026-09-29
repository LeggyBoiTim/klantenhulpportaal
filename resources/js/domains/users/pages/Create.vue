<template>
    <h1><b>Registreren</b></h1>
    <Form :user="user" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { createUser, Role, User } from '../store';
import { ref } from 'vue';
import Form from '../components/Form.vue';
import { New } from '../../../services/store';

const router = useRouter();

const user = ref<New<User>>({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    role: Role.User
});

const handleSubmit = async (data: User) => {
    await createUser(data);
    router.push({ name: 'auth.login' });
};
</script>