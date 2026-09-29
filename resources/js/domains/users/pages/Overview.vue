<template>
    <div v-if="sortedUsers">
        <h1><b>Overzicht</b></h1>
        <table>
            <thead>
                <tr>
                    <th @click="sortBy('id')" style="cursor: pointer;">ID {{ getSortIcon('id') }}</th>
                    <th @click="sortBy('first_name')" style="cursor: pointer;">Voornaam {{ getSortIcon('first_name') }}</th>
                    <th @click="sortBy('last_name')" style="cursor: pointer;">Achternaam {{ getSortIcon('last_name') }}</th>
                    <th @click="sortBy('email')" style="cursor: pointer;">E-mail {{ getSortIcon('email') }}</th>
                    <th @click="sortBy('role')" style="cursor: pointer;">Rol {{ getSortIcon('role') }}</th>
                    <th @click="sortBy('phone_number')" style="cursor: pointer;">Telefoonnummer {{ getSortIcon('phone_number') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in sortedUsers" :key="user.id">
                    <td style="text-align: right;">{{ user.id }}</td>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ formatRole(user.role) }}</td>
                    <td style="text-align: right;">{{ user.phone_number }}</td>
                    <td><RouterLink :to="{ name: 'users.edit', params: { id: user.id } }">Bewerk</RouterLink></td>
                    <td><button @click="handleDelete(user.id)" style="cursor: pointer;">Verwijder</button></td>
                </tr>
            </tbody>
        </table>
        <ErrorMessage />
    </div>
</template>

<script setup lang="ts">
import ErrorMessage from '../../../ErrorMessage.vue';
import { sortTable } from '../../../services/helpers/table';
import { deleteUser, fetchAllUsers, formatRole, getUsers, User } from '../store';

fetchAllUsers();

const { sortedItems: sortedUsers, sortBy, getSortIcon } = sortTable<User>(
    getUsers,
    'id',
    'asc'
);

const handleDelete = async (id: number) => {
    const confirmation = confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?');
    if (!confirmation) return;
    await deleteUser(id);
}
</script>