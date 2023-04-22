<script setup>
const modal = useModal();
const slots = useSlots()
console.log()
provide("modal", modal.value.currentModal);
</script>

<template>
  <div v-if="modal.show" id="modals">
    <slot />
  </div>
</template>

<style>
#modals {
    @apply bg-zinc-900/30 z-20 fixed top-0 left-0 right-0 bottom-0 grid place-items-center;
}
</style>
