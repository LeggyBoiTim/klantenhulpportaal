<template>
    <nav>
        <RouterLink v-if="loggedInUser" to="/tickets">Tickets</RouterLink>
        <RouterLink v-if="loggedInUser" to="/me">Me</RouterLink>
        <button v-if="loggedInUser" @click="handleLogout" style="cursor: pointer;">Logout</button>
        <RouterLink v-if="!loggedInUser" to="/login">Login</RouterLink>
    </nav>
    <router-view />
</template>

<script setup lang="ts">
import { deleteAuth, loggedInUser } from './domains/auth/store';
import { RouterLink, useRouter} from 'vue-router';

const router = useRouter();

const handleLogout = async () => {
    await deleteAuth();
    router.push({ name: 'auth.login' });
}
</script>

<style>
* {
    padding-right: 0.5em;
}
</style>