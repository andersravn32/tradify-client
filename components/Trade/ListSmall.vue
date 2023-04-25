<script setup>
import ListItemSmall from "./ListItemSmall.vue";

defineProps({
  trades: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="flex flex-col">
    <ListItemSmall
      class="odd:bg-zinc-800/50"
      v-for="trade in trades"
      :trade="trade"
    />
  </ul>
</template>
