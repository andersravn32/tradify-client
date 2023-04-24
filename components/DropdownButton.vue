<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  position: {
    type: String,
    default: "right",
  },
});

const open = ref(props.open);
</script>

<template>
  <div class="dropdown-button">
    <Button @click="open = !open" class="dropdown-button-icon" type="icon">
      <slot name="icon" />
    </Button>
    <div
      v-if="open"
      class="dropdown-button-content"
      :class="`button-position-${position}`"
      @mouseleave="open = false"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<style>
.dropdown-button {
  @apply relative text-zinc-50;
}

.dropdown-button-content {
  @apply absolute bg-zinc-800 p-2 rounded shadow-lg z-10;
}

.button-position-left {
    @apply right-full top-0 mr-2;
}
.button-position-right {
    @apply left-full top-0 ml-2;
}
.button-position-top {
    @apply bottom-full mb-2;
}
.button-position-bottom {
    @apply top-full mt-2;
}
</style>
