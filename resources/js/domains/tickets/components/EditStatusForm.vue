<template>
    <form @submit.prevent="handleSubmit">
        <label for="status">Status:</label>
        <select id="status" v-model="form.status" required>
            <option v-for="status in statuses" :key="status" :value="status">
                {{ formatStatus(status) }}
            </option>
        </select>
        <FormError name="status" />

        <button type="submit">Opslaan</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';
import { formatStatus, Status } from '../store.js';

const props = defineProps({ ticket: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.ticket });
const handleSubmit = () => emit('submit', form.value);

const statuses = Object.values(Status);
</script>