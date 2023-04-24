<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
});

const selectedTitle = inject("selectedTitle");
</script>

<template>
  <div v-if="selectedTitle == title && !hidden" class="tab">
    <slot />
  </div>
</template>
