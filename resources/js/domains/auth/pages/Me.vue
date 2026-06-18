<template>
    <div v-if="loggedInUser">
        <p>Name: {{ loggedInUser.name || 'N/A' }}</p>
        <p>Email: {{ loggedInUser.email || 'N/A' }}</p>
    </div>
</template>

<script setup lang="ts">
import { loggedInUser } from '../store';
</script>