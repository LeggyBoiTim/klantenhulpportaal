<template>
    <h1><b>Gebruiker bewerken</b></h1>
    <Form :user="user" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getUserById, User, updateUser } from '../store';
import { ref } from 'vue';
import Form from '../components/Form.vue';
import { Updatable } from '../../../services/store';

const route = useRoute()
const router = useRouter();

const user = ref<Updatable<User>>(getUserById(Number(route.params.id)).value);

const handleSubmit = async (data: User) => {
    await updateUser(Number(route.params.id), data);
    router.push({ name: 'users.overview' });
};
</script>