<script setup>
const modal = useModal();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="modal" :class="{'modal-hidden': id != modal.currentModal}">
    <slot />
  </div>
</template>

<style>
.modal{
    @apply bg-zinc-800 rounded shadow-lg;
}

.modal-hidden {
    @apply hidden;
}
</style>