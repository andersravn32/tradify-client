<script setup>
defineProps({
    size: {
        type: String,
        default: "md"
    },
    light: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>

<template>
    <img id="logo" :src="light ? '/tradify_logo_light.svg' : '/tradify_logo.svg'" :class="`logo-${size}`"
        alt="Tradify Logo" />
</template>

<style>
.logo-xs {
    @apply h-8;
}

.logo-sm {
    @apply h-12;
}

.logo-md {
    @apply h-16;
}

.logo-lg {
    @apply h-24;
}

.logo-xl {
    @apply h-32;
}
</style>