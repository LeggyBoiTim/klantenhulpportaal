<template>
    <div v-if="route.name === 'tickets.edit'">
        <h1><b>Ticket wijzigen</b></h1>
        <Form :ticket="ticket" @submit="handleSubmit" />
    </div>
    <div v-if="route.name === 'tickets.edit-assigned'">
        <h1><b>Ticket toewijzen aan administrator</b></h1>
        <EditAssignedForm :ticket="ticket" @submit="handleSubmit" />
    </div>
    <div v-if="route.name === 'tickets.edit-status'">
        <h1><b>Ticket status wijzigen</b></h1>
        <EditStatusForm :ticket="ticket" @submit="handleSubmit" />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getTicketById, Ticket, updateTicket } from '../store';
import Form from '../components/Form.vue';
import { ref } from 'vue';
import { Updatable } from '../../../services/store';
import EditAssignedForm from '../components/EditAssignedForm.vue';
import EditStatusForm from '../components/EditStatusForm.vue';

const route = useRoute()
const router = useRouter();

const ticket = ref<Updatable<Ticket>>(getTicketById(Number(route.params.id)).value);

const handleSubmit = async (data: Ticket) => {
    await updateTicket(Number(route.params.id), data);
    router.push({ name: 'tickets.show', params: { id: data.id } });
};
</script>