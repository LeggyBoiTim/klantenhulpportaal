<template>
    <nav>
        <span v-if="currentUser">
            <RouterLink to="/tickets/create">Nieuwe Ticket</RouterLink> | 
            <RouterLink to="/tickets">Mijn Tickets</RouterLink> | 
            <RouterLink to="/me">Me</RouterLink> |
            <button @click="handleLogout" style="cursor: pointer;">Logout</button>
        </span> 
        <RouterLink v-else to="/login">Login</RouterLink>
    </nav>
    <router-view />
</template>

<script setup lang="ts">
import { deleteAuth, currentUser } from './domains/auth/store';
import { RouterLink, useRouter} from 'vue-router';

const router = useRouter();

const handleLogout = async () => {
    await deleteAuth();
    router.push({ name: 'auth.login' });
}
</script>

<style>
th, td {
    padding-right: 0.5em;
    text-align: left;
}
</style>