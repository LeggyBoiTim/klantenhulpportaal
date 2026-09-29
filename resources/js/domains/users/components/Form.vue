<template>
    <form @submit.prevent="handleSubmit">
        <label for="email">E-mailadres: </label>
        <input id="email" v-model="form.email" type="email" required/>
        <br>
        <label for="first_name">Voornaam: </label>
        <input id="first_name" v-model="form.first_name" type="text" required/>
        <br>
        <label for="last_name">Achternaam: </label>
        <input id="last_name" v-model="form.last_name" type="text" required/>
        <br>
        <label for="phone_number">Telefoonnummer: </label>
        <input id="phone_number" v-model="form.phone_number" type="text" required/>
        <br>
        <label for="role">Rol: </label>
        <select id="role" v-model="form.role" required>
            <option v-for="role in roles" :key="role" :value="role">
                {{ formatRole(role) }}
            </option>
        </select>
        <br><br>
        <button type="submit" style="cursor: pointer;">Opslaan</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatRole, Role } from '../store.js';
import ErrorMessage from '../../../ErrorMessage.vue';

const props = defineProps({ user: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.user });
const handleSubmit = () => emit('submit', form.value);

const roles = Object.values(Role);
</script>