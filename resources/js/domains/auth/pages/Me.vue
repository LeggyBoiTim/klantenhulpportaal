<template>
    <div v-if="currentUser">
        <p>Name: {{ currentUser.name || 'N/A' }}</p>
        <p>Email: {{ currentUser.email || 'N/A' }}</p>
    </div>
</template>

<script setup lang="ts">
import { currentUser } from '../store';
</script>