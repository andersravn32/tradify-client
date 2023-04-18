<script setup>

// Define component props
defineProps({
    label: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
    },
    size: {
        type: String,
        default: "md"
    }
})

// Define emits
const emit = defineEmits(['input'])

// Main input value, contents will be emitted upon change
const value = ref(null);
</script>

<template>
    <div :class="`input input-size-${size}`">
        <label :for="label">{{ label }}</label>
        <input :type="type" :placeholder="placeholder ? placeholder : null" v-model="value"
            @input="(e) => { $emit('input', { ...e, value }) }" />
    </div>
</template>

<style>
.input {
    @apply flex flex-col space-y-2;
}

.input input {
    @apply bg-zinc-800 rounded outline-indigo-500;
}

.input label {
    @apply text-zinc-400 uppercase;
}

.input-size-sm label {
    @apply text-xs;
}

.input-size-sm input {
    @apply py-1 px-3 text-xs;
}

.input-size-md label {
    @apply text-sm;
}

.input-size-md input {
    @apply py-2 px-6 text-sm;
}

.input-size-lg label {
    @apply text-base;
}

.input-size-lg input {
    @apply py-3 px-9 text-base;
}

.input-size-xl {
    @apply text-lg;
}

.input-size-xl input {
    @apply py-4 px-12 text-lg;
}
</style>