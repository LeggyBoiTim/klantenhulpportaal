<template>
    <nav>
        <RouterLink to="/tickets">Tickets</RouterLink> |
        <RouterLink to="/login">Login</RouterLink> | 
        <button @click="handleLogout" style="cursor: pointer;">Logout</button> | 
        <button @click="handleMe" style="cursor: pointer;">Me</button>
    </nav>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { deleteAuth } from './domains/auth/store';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = async () => {
    await deleteAuth();
    router.push({ name: 'auth.login' });
}

const handleMe = async () => {
    router.push({ name: 'auth.me' })
}
</script>