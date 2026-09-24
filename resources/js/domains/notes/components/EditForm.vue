<template>
    <form @submit.prevent="handleSubmit">
        <label for={{ form.id }}><i>{{ formatDate(form.created_at) }}:</i></label><br>
        <input id={{ form.id }} v-model="form.content" type="text" required autofocus/>
        <FormError name="content" /><br>

        <button type="submit" style="cursor: pointer;">Wijzig notitie</button>&nbsp;&nbsp;
        <button type="button" @click="emit('cancel')" style="cursor: pointer;">Annuleer</button>
    </form>
    
    <ErrorMessage />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ErrorMessage from '../../../ErrorMessage.vue';
import FormError from '../../../FormError.vue';
import { formatDate } from '../../../services/helpers/date.js';

const props = defineProps({ note: Object });
const emit = defineEmits(['submit', 'cancel']);
const form = ref({ ...props.note });
const handleSubmit = () => emit('submit', form.value);
</script>