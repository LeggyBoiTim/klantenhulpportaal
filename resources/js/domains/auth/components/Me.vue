<template>
    <p>Name: {{ auth.user?.name || 'N/A' }}</p>
    <p>Email: {{ auth.user?.email || 'N/A' }}</p>
    <button @click="handleBack" style="cursor: pointer;">Go back</button>
</template>

<script setup lang="ts">
import { getAuth } from '../store';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();

const handleBack = async () => {
    router.push({ name: 'tickets.overview' });
};
</script>