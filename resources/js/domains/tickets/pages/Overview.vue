<template>
    <table>
        <thead>
            <tr>
                <th @click='sortBy("id")'>ID {{ getSortIcon('id') }}</th>
                <th @click='sortBy("title")'>Titel {{ getSortIcon('title') }}</th>
                <th @click='sortBy("category_id")'>Categorieën {{ getSortIcon('category_id') }}</th>
                <th @click='sortBy("status")'>Status {{ getSortIcon('status') }}</th>
                <th @click='sortBy("user_id")'>Aangemaakt door {{ getSortIcon('user_id') }}</th>
                <th @click='sortBy("created_at")'>Aangemaakt op {{ getSortIcon('created_at') }}</th>
                <th @click='sortBy("updated_at")'>Laatste update op {{ getSortIcon('updated_at') }}</th>
                <th @click='sortBy("assigned_id")'>Toegewezen aan {{ getSortIcon('assigned_id') }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="ticket in sortedTickets" :key="ticket.id">
                <template v-if="isCurrentUser(ticket.user_id).value || currentUserIsAdmin">
                    <td style="text-align: right;">{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ getCategoryById(ticket.category_id).value?.title }}</td>
                    <td>{{ formatStatus(ticket.status) }}</td>
                    <td>{{ getUserById(ticket.user_id).value?.name }}</td>
                    <td>{{ formatDate(ticket.created_at) }}</td>
                    <td>{{ formatDate(ticket.updated_at) }}</td>
                    <td>{{ getUserById(ticket.assigned_id).value?.name ?? 'Nog niet toegewezen' }}</td>
                    <td><RouterLink :to="{ name: 'tickets.show', params: { id: ticket.id } }">Bekijk</RouterLink></td>
                    <td><RouterLink :to="{ name: 'tickets.edit', params: { id: ticket.id } }">Bewerk</RouterLink></td>
                    <td><button @click="deleteTicket(ticket.id)" style="cursor: pointer;">Verwijder</button></td>
                </template>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { deleteTicket, getTickets, Status, Ticket } from '../store';
import { getCategoryById } from '../../categories/store';
import { getUserById } from '../../users/store';
import { currentUserIsAdmin, isCurrentUser } from '../../auth/store';

const sortKey = ref('created_at');
const sortOrder = ref('desc');

const sortedTickets = computed(() => {
    return [...getTickets.value].sort((a, b) => {
        const aVal = a[sortKey.value as keyof Ticket];
        const bVal = b[sortKey.value as keyof Ticket];
        if (aVal === null) return sortOrder.value === 'asc' ? -1 : 1;
        if (bVal === null) return sortOrder.value === 'asc' ? -1 : 1;
        if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1;
        return 0;
    });
});

const sortBy = (key: keyof Ticket) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortKey.value = key;
        sortOrder.value = 'asc';
    }
}

const getSortIcon = (key: keyof Ticket) => {
    if (sortKey.value !== key) return '';
    return sortOrder.value === 'asc' ? '↑' : '↓';
}

const formatDate = (date: Date) => {
    let newDate = new Date(date);
    return newDate.toLocaleDateString("nl-NL", {day: "2-digit", month: "2-digit", year: "numeric"}) + ' ' + newDate.toLocaleTimeString("nl-NL");
}

const formatStatus = (status: Status) => {
    return status === Status.Open ? "In afwachting" : status === Status.InProgress ? "In behandeling" : "Afgehandeld";
}
</script>