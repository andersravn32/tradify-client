<script setup>
defineProps({
    title: {
        required: true
    }
})

const selectedTitle = inject("selectedTitle");
</script>

<template>
    <div v-if="selectedTitle == title" class="tab">
        <slot />
    </div>
</template>