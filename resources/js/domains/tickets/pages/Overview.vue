<template>
    <div v-if="sortedTickets">
        <h1><b>Overzicht</b></h1>
        <table>
            <thead>
                <tr>
                    <th @click='sortBy("id")'>ID {{ getSortIcon('id') }}</th>
                    <th @click='sortBy("title")'>Titel {{ getSortIcon('title') }}</th>
                    <th @click='sortBy("category_name")'>Categorie {{ getSortIcon('category_name') }}</th>
                    <th @click='sortBy("status")'>Status {{ getSortIcon('status') }}</th>
                    <th @click='sortBy("user_name")'>Aangemaakt door {{ getSortIcon('user_name') }}</th>
                    <th @click='sortBy("created_at")'>Aangemaakt op {{ getSortIcon('created_at') }}</th>
                    <th @click='sortBy("updated_at")'>Laatste update op {{ getSortIcon('updated_at') }}</th>
                    <th @click='sortBy("assigned_name")'>Toegewezen aan {{ getSortIcon('assigned_name') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in sortedTickets" :key="ticket.id">
                    <td style="text-align: right;">{{ ticket.id }}</td>
                    <td>{{ ticket.title }}</td>
                    <td>{{ ticket.category_name }}</td>
                    <td>{{ formatStatus(ticket.status) }}</td>
                    <td>{{ ticket.user_name }}</td>
                    <td>{{ formatDate(ticket.created_at) }}</td>
                    <td>{{ formatDate(ticket.updated_at) }}</td>
                    <td>{{ ticket.assigned_name ? ticket.assigned_name : 'Nog niet toegewezen' }}</td>
                    <td><RouterLink :to="{ name: 'tickets.show', params: { id: ticket.id } }">Bekijk ticket</RouterLink></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { fetchAllTickets, formatStatus, getTickets, Ticket } from '../store';
import { formatDate } from '../../../services/helpers/date';
import { sortTable } from '../../../services/helpers/table';

fetchAllTickets();

const { sortedItems: sortedTickets, sortBy, getSortIcon } = sortTable<Ticket>(
    getTickets,
    'created_at',
    'desc'
);
</script>