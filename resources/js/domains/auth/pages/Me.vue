<template>
    <div v-if="auth">
        <p>Name: {{ auth.name }}</p>
        <p>Email: {{ auth.email }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getRequest } from '../../../services/http';

const router = useRouter();
const auth = ref(null);

onMounted(async () => {
    try {
        const response = await getRequest('user');
        auth.value = response.data;
    } catch {
        router.push({ name: 'auth.login' })
    }
});
</script>