<template>
    <form @submit.prevent="handleSubmit">
        <label for="assigned_id">Administrator:</label>
        <select id="assigned_id" v-model="form.assigned_id" required>
            <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
            </option>
        </select>
        <FormError name="assigned_id" />

        <button type="submit">Opslaan</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';
import { getUsers } from '../../users/store.js';

const props = defineProps({ ticket: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.ticket });
const handleSubmit = () => emit('submit', form.value);

const users = getUsers;
</script>