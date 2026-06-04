<template>
    <ErrorMessage />

    <form @submit.prevent="handleSubmit">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required/>
        <FormError name="email" />

        <label for="password">Password</label>
        <input type="password" id="password" v-model="form.password" required/>
        <FormError name="password" />

        <button type="submit">Login</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';

const props = defineProps({ user: Object });
const emit = defineEmits(['submit']);
const form = ref({ ...props.user });
const handleSubmit = () => emit('submit', form.value);
</script>