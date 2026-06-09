<template>
    <nav>
        
        <RouterLink to="/home">Home</RouterLink> | 
        <RouterLink to="/login">Login</RouterLink> | 
        <button @click="handleLogout">Logout</button>
    </nav>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { deleteAuth } from './domains/auth/store';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = async () => {
    await deleteAuth();
    router.push({ name: 'auth.login' });
}
</script>