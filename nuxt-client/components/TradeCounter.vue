<script setup>
const props = defineProps({
  trades: {
    type: Array,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
});

const counts = ref({
  positive: 0,
  neutral: 0,
  negative: 0,
});

props.trades.forEach((trade) => {
  if (!trade.completed) {
    return;
  }

  if (trade.to.uuid == props.userId) {
    if (trade.to.rating.value == -1) {
      counts.value.negative++;
    }
    if (trade.to.rating.value == 0) {
      counts.value.neutral++;
    }
    if (trade.to.rating.value == 1) {
      counts.value.positive++;
    }
  }

  if (trade.from.uuid == props.userId) {
    if (trade.from.rating.value == -1) {
      counts.value.negative++;
    }
    if (trade.from.rating.value == 0) {
      counts.value.neutral++;
    }
    if (trade.from.rating.value == 1) {
      counts.value.positive++;
    }
  }
});
</script>

<template>
  <div
    class="w-full grid grid-cols-5 place-items-center bg-zinc-900 p-4 font-semibold rounded text-zinc-400"
  >
    <span class="text-green-500">{{ counts.positive }}</span> <span>/</span
    ><span class="text-zinc-100">{{ counts.neutral }}</span
    ><span>/</span>
    <span class="text-red-500">{{ counts.negative }}</span>
  </div>
</template>
