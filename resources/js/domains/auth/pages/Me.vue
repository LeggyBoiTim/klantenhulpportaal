<template>
    <div v-if="currentUser">
        <p>Name: {{ currentUser.name }}</p>
        <p>Email: {{ currentUser.email }}</p>
        <button @click="handleBack" style="cursor: pointer;">Go back</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getRequest } from '../../../services/http';

const router = useRouter();
const currentUser = ref(null);

onMounted(async () => {
    try {
        const response = await getRequest('user');
        currentUser.value = response.data;
    } catch (error) {
        router.push({ name: 'auth.login' })
    }
});

const handleBack = async () => {
    router.push({ name: 'tickets.overview' });
};
</script>