<template>
    <div v-if="sortedTickets">
        <h1><b>Overzicht</b></h1>
        <table>
            <thead>
                <tr>
                    <th @click='sortBy("id")'>ID {{ getSortIcon('id') }}</th>
                    <th @click='sortBy("title")'>Titel {{ getSortIcon('title') }}</th>
                    <th @click='sortBy("category")'>Categorie {{ getSortIcon('category_id') }}</th>
                    <th @click='sortBy("status")'>Status {{ getSortIcon('status') }}</th>
                    <th @click='sortBy("user")'>Aangemaakt door {{ getSortIcon('user_id') }}</th>
                    <th @click='sortBy("created_at")'>Aangemaakt op {{ getSortIcon('created_at') }}</th>
                    <th @click='sortBy("updated_at")'>Laatste update op {{ getSortIcon('updated_at') }}</th>
                    <th @click='sortBy("assigned")'>Toegewezen aan {{ getSortIcon('assigned_id') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in sortedTickets" :key="ticket.id">
                    <td style="text-align: right;">{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.category }}</td>
                    <td>{{ formatStatus(ticket.status) }}</td>
                    <td>{{ ticket.user }}</td>
                    <td>{{ formatDate(ticket.created_at) }}</td>
                    <td>{{ formatDate(ticket.updated_at) }}</td>
                    <td>{{ ticket.assigned ? ticket.assigned : 'Nog niet toegewezen' }}</td>
                    <td><RouterLink :to="{ name: 'tickets.show', params: { id: ticket.id } }">Bekijk ticket</RouterLink></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { fetchAllTickets, formatStatus, getTickets, Ticket } from '../store';
import { formatDate } from '../../../services/helpers';

fetchAllTickets();

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
</script>