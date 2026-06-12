<template>
    <nav>
        <RouterLink v-if="auth" to="/tickets">Tickets</RouterLink>
        <RouterLink v-if="!auth" to="/login">Login</RouterLink>
        <button v-if="auth" @click="handleLogout" style="cursor: pointer;">Logout</button>
        <RouterLink v-if="auth" to="/me">Me </RouterLink>
    </nav>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { deleteAuth } from './domains/auth/store';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { getRequest } from './services/http';

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

const handleLogout = async () => {
    await deleteAuth();
    router.push({ name: 'auth.login' });
}
</script>