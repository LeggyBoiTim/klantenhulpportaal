<template>
    <form @submit.prevent="handleSubmit">
        <label for="email">E-mail: </label>
        <input type="email" id="email" v-model="form.email" required/>
        <br>

        <label for="first_name">Voornaam: </label>
        <input type="text" id="first_name" v-model="form.first_name" required/>
        <br>

        <label for="last_name">Achternaam: </label>
        <input type="text" id="last_name" v-model="form.last_name" required/>
        <br>

        <label for="phone_number">Telefoonnummer: </label>
        <input type="tel" pattern="\+?[1-9][0-9]{7,14}" id="phone_number" v-model="form.phone_number" required/>
        <br>

        <label for="password">Wachtwoord: </label>
        <input type="password" id="password" v-model="form.password" required/>
        <br>
        
        <label for="password_confirmation">Wachtwoord herhalen: </label>
        <input type="password" id="password_confirmation" v-model="form.password_confirmation" required/>
        <br><br>

        <button type="submit" style="cursor: pointer;">Registreer</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';

const props = defineProps({ user: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.user });
const handleSubmit = () => emit('submit', form.value);
</script>