<template>
    <h2><b>Nieuwe Ticket</b></h2>
    <Form :ticket="ticket" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createTicket } from '../store';
import { currentUser } from '../../auth/store';
import Form from '../components/Form.vue';

const router = useRouter();

const ticket = ref({
    assigned_id: null,
    category_id: '',
    user_id: currentUser.value.id,
    title: '',
    content: '',
    status: 'open'
});

const handleSubmit = async (data) => {
    await createTicket(data);
    router.push({ name: 'tickets.overview' });
};
</script>