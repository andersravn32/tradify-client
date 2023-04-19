<script setup>
const props = defineProps({
  trades: {
    type: Array,
    required: false,
  },
});

const counts = ref({
  positive: 0,
  neutral: 0,
  negative: 0,
});
</script>

<template>
  <div
    class="w-full grid grid-cols-5 place-items-center bg-zinc-900 p-4 text-lg font-semibold rounded text-zinc-400"
  >
    <span class="text-green-500">{{ counts.positive }}</span> <span>/</span
    ><span class="text-zinc-100">{{ counts.neutral }}</span
    ><span>/</span>
    <span class="text-red-500">{{ counts.negative }}</span>
  </div>
</template>
