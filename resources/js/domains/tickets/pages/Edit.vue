<template>
    <h2><b>Ticket Wijzigen</b></h2>
    <Form :ticket="ticket" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getTicketById, Ticket, updateTicket } from '../store';
import Form from '../components/Form.vue';

const route = useRoute()
const router = useRouter();

const ticket = getTicketById(route.params.id);

const handleSubmit = async (data: Ticket) => {
    await updateTicket(route.params.id, data);
    router.push({ name: 'tickets.overview' });
};
</script>