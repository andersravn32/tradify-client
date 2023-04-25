<script setup>
const props = defineProps({
  trades: {
    type: Array,
    required: false,
  },
  size: {
    type: String,
    default: "md",
  },
  uuid: {
    type: String,
    required: true,
  },
});

const counts = ref({
  positive: 0,
  neutral: 0,
  negative: 0,
});

// TODO: Rewrite trade count logic
props.trades.forEach((trade) => {
  if (trade.from.uuid == props.uuid) {
    if (trade.to.rating && trade.to.rating.value === 1) {
      counts.value.positive++;
    }
    if (trade.to.rating && trade.to.rating.value === 0) {
      counts.value.neutral++;
    }
    if (trade.to.rating && trade.to.rating.value === -1) {
      counts.value.negative++;
    }

    if (trade.middleman.rating && trade.middleman.rating.value === 1) {
      counts.value.positive++;
    }
    if (trade.middleman.rating && trade.middleman.rating.value === 0) {
      counts.value.neutral++;
    }
    if (trade.middleman.rating && trade.middleman.rating.value === -1) {
      counts.value.negative++;
    }
  }

  if (trade.to.uuid == props.uuid) {
    if (trade.from.rating && trade.from.rating.value === 1) {
      counts.value.positive++;
    }
    if (trade.from.rating && trade.from.rating.value === 0) {
      counts.value.neutral++;
    }
    if (trade.from.rating && trade.from.rating.value === -1) {
      counts.value.negative++;
    }

    if (trade.middleman.rating && trade.middleman.rating.value === 1) {
      counts.value.positive++;
    }
    if (trade.middleman.rating && trade.middleman.rating.value === 0) {
      counts.value.neutral++;
    }
    if (trade.middleman.rating && trade.middleman.rating.value === -1) {
      counts.value.negative++;
    }
  }

  if (trade.middleman.uuid == props.uuid) {
    if (trade.from.rating && trade.from.rating.value === 1) {
      counts.value.positive++;
    }
    if (trade.from.rating && trade.from.rating.value === 0) {
      counts.value.neutral++;
    }
    if (trade.from.rating && trade.from.rating.value === -1) {
      counts.value.negative++;
    }
    if (trade.to.rating && trade.to.rating.value === 1) {
      counts.value.positive++;
    }
    if (trade.to.rating && trade.to.rating.value === 0) {
      counts.value.neutral++;
    }
    if (trade.to.rating && trade.to.rating.value === -1) {
      counts.value.negative++;
    }
  }
});
</script>

<template>
  <div>
    <div
      v-if="size == 'md'"
      class="w-full grid grid-cols-5 place-items-center bg-zinc-900 p-4 font-semibold rounded text-zinc-400"
    >
      <span class="text-green-500">{{ counts.positive }}</span> <span>/</span
      ><span class="text-zinc-100">{{ counts.neutral }}</span
      ><span>/</span>
      <span class="text-red-500">{{ counts.negative }}</span>
    </div>

    <div
      v-if="size == 'sm'"
      class="text-zinc-400 grid grid-cols-5 place-items-center font-semibold"
    >
      <span class="text-green-500">{{ counts.positive }}</span
      ><span>/</span><span class="text-zinc-100">{{ counts.neutral }}</span
      ><span>/</span>
      <span class="text-red-500">{{ counts.negative }}</span>
    </div>
  </div>
</template>
