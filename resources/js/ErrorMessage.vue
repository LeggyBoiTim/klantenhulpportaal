<template>
    <div v-if="getMessage" style="color: red;">
        {{ getMessage }}
    </div>
</template>

<script setup lang="ts">
import { getMessage } from './services/error';
</script>