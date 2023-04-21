<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const open = ref(props.open);
</script>

<template>
  <div class="dropdown-button">
    <Button @click="open = !open" class="dropdown-button-icon" type="icon">
      <slot name="icon" />
    </Button>
    <div v-if="open" class="dropdown-button-content" @mouseleave="open = false">
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.dropdown-button {
  @apply relative text-zinc-50;
}

.dropdown-button-content {
  @apply absolute bg-zinc-800 p-4 rounded left-full top-0 ml-2 shadow-lg;
}
</style>
