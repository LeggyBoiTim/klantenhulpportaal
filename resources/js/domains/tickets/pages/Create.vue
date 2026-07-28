<template>
    <h1><b>Ticket aanmaken</b></h1>
    <Form :ticket="ticket" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createTicket, Status, Ticket } from '../store';
import { currentUser } from '../../auth/store';
import Form from '../components/Form.vue';
import { New } from '../../../services/store';

const router = useRouter();

const ticket = ref<New<Ticket>>({
    assigned_id: null,
    category_id: 1,
    user_id: currentUser.value?.id,
    title: '',
    content: '',
    status: Status.Open,
    created_at: new Date,
    updated_at: new Date,
    reactions: [],
    notes: [],
    assigned: '',
    category: '',
    user: ''
});

const handleSubmit = async (data: Ticket) => {
    await createTicket(data);
    router.push({ name: 'tickets.overview' });
};
</script>