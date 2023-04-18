<script setup>
defineProps({
    type: {
        type: String,
        default: "primary"
    },
    size: {
        type: String,
        default: "md"
    },

    loading: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <button :class="`btn btn-size-${size} btn-${type}`">
        <slot />
    </button>
</template>

<style>
.btn-size-sm {
    @apply py-1 px-3 text-xs;
}

.btn-size-md {
    @apply py-2 px-6 text-sm;
}

.btn-size-lg {
    @apply py-3 px-9 text-base;
}

.btn-size-xl {
    @apply py-4 px-12 text-lg;
}

.btn-primary {
    @apply bg-indigo-500 font-semibold rounded shadow-sm hover:bg-indigo-600 focus:outline-indigo-500;
}

.btn-secondary {
    @apply border border-indigo-500 text-indigo-500 font-semibold rounded shadow-sm hover:border-indigo-600 hover:text-indigo-600 focus:outline-indigo-500;
}

.btn-tertiary {
    @apply text-indigo-500 hover:text-indigo-600 focus:outline-indigo-500 py-0 px-0;
}
</style>