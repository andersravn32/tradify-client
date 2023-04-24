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
  <div v-if="id == modal.currentModal" class="modal">
    <slot />
  </div>
</template>

<style>
.modal{
    @apply bg-zinc-800 rounded shadow-lg;
}

.modal .input input, #form-trade-create textarea, #form-trade-rate textarea, .modal select {
  @apply bg-zinc-900;
}
</style>