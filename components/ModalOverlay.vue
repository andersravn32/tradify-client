<script setup>
const modal = useModal();

const handleClick = (e) => {
  if (!(e.target.id == "modals")) {
    return;
  }
  modal.value.currentModal = "";
  modal.value.show = false;

  return;
};
</script>

<template>
  <div v-if="modal.show" @mousedown="handleClick" id="modals">
    <slot />
  </div>
</template>

<style>
#modals {
  @apply bg-zinc-900/30 z-20 fixed top-0 left-0 right-0 bottom-0 grid place-items-center;
}
</style>
