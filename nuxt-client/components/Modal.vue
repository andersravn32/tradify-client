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

.modal .input input, #form-trade-create textarea {
  @apply bg-zinc-900;
}

.modal .user{
  @apply bg-zinc-900 p-2 rounded;
}
</style>