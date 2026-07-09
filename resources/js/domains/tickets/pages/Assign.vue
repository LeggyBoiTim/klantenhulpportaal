<template>
    <h1><b>Ticket Toewijzen aan Administrator</b></h1>
    <AssignForm :ticket="ticket" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getTicketById, Ticket, updateTicket } from '../store';
import AssignForm from '../components/AssignForm.vue';
import { ref } from 'vue';
import { Updatable } from '../../../services/store';

const route = useRoute()
const router = useRouter();

const ticket = ref<Updatable<Ticket>>(getTicketById(Number(route.params.id)).value);

const handleSubmit = async (data: Ticket) => {
    await updateTicket(Number(route.params.id), data);
    router.push({ name: 'tickets.show', params: { id: data.id } });
};
</script>