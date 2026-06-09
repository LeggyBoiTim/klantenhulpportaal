<template>
    <form @submit.prevent="handleSubmit">
        <button type="submit">Submit</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';

const props = defineProps({ reaction: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.reaction });
const handleSubmit = () => emit('submit', form.value);
</script>