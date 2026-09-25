<template>
    <div v-if="currentUser">
        <p>Voornaam: {{ currentUser.first_name || 'N/A' }}</p>
        <p>Achternaam: {{ currentUser.last_name || 'N/A' }}</p>
        <p>E-mail: {{ currentUser.email || 'N/A' }}</p>
    </div>
</template>

<script setup lang="ts">
import { currentUser } from '../store';
</script>