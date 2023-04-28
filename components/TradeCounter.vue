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
  total: {
    positive: 0,
    neutral: 0,
    negative: 0,
  },
  monthly: {
    positive: 0,
    neutral: 0,
    negative: 0,
  },
});

// TODO: Rewrite trade count logic
props.trades.forEach((trade) => {
  console.log();
  if (trade.from.uuid == props.uuid) {
    if (trade.to.rating && trade.to.rating.value === 1) {
      counts.value.total.positive++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.positive++;
      }
    }
    if (trade.to.rating && trade.to.rating.value === 0) {
      counts.value.total.neutral++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.neutral++;
      }
    }
    if (trade.to.rating && trade.to.rating.value === -1) {
      counts.value.total.negative++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.negative++;
      }
    }

    if (trade.middleman.rating && trade.middleman.rating.value === 1) {
      counts.value.total.positive++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.positive++;
      }
    }
    if (trade.middleman.rating && trade.middleman.rating.value === 0) {
      counts.value.total.neutral++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.neutral++;
      }
    }
    if (trade.middleman.rating && trade.middleman.rating.value === -1) {
      counts.value.total.negative++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.negative++;
      }
    }
  }

  if (trade.to.uuid == props.uuid) {
    if (trade.from.rating && trade.from.rating.value === 1) {
      counts.value.total.positive++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.positive++;
      }
    }
    if (trade.from.rating && trade.from.rating.value === 0) {
      counts.value.total.neutral++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.neutral++;
      }
    }
    if (trade.from.rating && trade.from.rating.value === -1) {
      counts.value.total.negative++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.negative++;
      }
    }

    if (trade.middleman.rating && trade.middleman.rating.value === 1) {
      counts.value.total.positive++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.positive++;
      }
    }
    if (trade.middleman.rating && trade.middleman.rating.value === 0) {
      counts.value.total.neutral++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.neutral++;
      }
    }
    if (trade.middleman.rating && trade.middleman.rating.value === -1) {
      counts.value.total.negative++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.negative++;
      }
    }
  }

  if (trade.middleman.uuid == props.uuid) {
    if (trade.from.rating && trade.from.rating.value === 1) {
      counts.value.total.positive++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.positive++;
      }
    }
    if (trade.from.rating && trade.from.rating.value === 0) {
      counts.value.total.neutral++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.neutral++;
      }
    }
    if (trade.from.rating && trade.from.rating.value === -1) {
      counts.value.total.negative++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.negative++;
      }
    }
    if (trade.to.rating && trade.to.rating.value === 1) {
      counts.value.total.positive++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.positive++;
      }
    }
    if (trade.to.rating && trade.to.rating.value === 0) {
      counts.value.total.neutral++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.neutral++;
      }
    }
    if (trade.to.rating && trade.to.rating.value === -1) {
      counts.value.total.negative++;
      if (new Date(trade.date) / 1000 >= new Date() / 1000 - 2629743) {
        counts.value.monthly.negative++;
      }
    }
  }
});
</script>

<template>
  <div>
    <div v-if="size == 'sm'" class="trade-counter-sm">
      <span class="text-green-500">{{ counts.total.positive }}</span
      ><span>/</span><span class="text-zinc-100">{{ counts.neutral }}</span
      ><span>/</span>
      <span class="text-red-500">{{ counts.total.negative }}</span>
    </div>
    <div v-if="size == 'md'" class="trade-counter-md">
      <span class="text-green-500">{{ counts.total.positive }}</span>
      <span>/</span><span class="text-zinc-100">{{ counts.total.neutral }}</span
      ><span>/</span>
      <span class="text-red-500">{{ counts.total.negative }}</span>
    </div>
    <div v-if="size == 'lg'" class="trade-counter-lg">
      <div class="flex flex-col space-y-2">
        <span class="text-zinc-400 uppercase text-sm">Positive</span>
        <div class="p-4 bg-zinc-800 flex flex-col rounded">
          <span
            class="text-4xl text-green-500 border-b-2 border-zinc-900 pb-2 mb-2"
            >{{ counts.total.positive }}</span
          >
          <p class="text-xs text-zinc-400">{{ counts.monthly.positive }} {{ counts.monthly.positive == 1 ? 'ny' : 'nye' }} denne måned</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <span class="text-zinc-400 uppercase text-sm">Neutrale</span>
        <div class="p-4 bg-zinc-800 flex flex-col rounded">
          <span
            class="text-4xl text-zinc-50 border-b-2 border-zinc-900 pb-2 mb-2"
            >{{ counts.total.neutral }}</span
          >
          <p class="text-xs text-zinc-400">{{ counts.monthly.neutral }} {{ counts.monthly.neutral == 1 ? 'ny' : 'nye' }} denne måned</p>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <span class="text-zinc-400 uppercase text-sm">Negative</span>
        <div class="p-4 bg-zinc-800 flex flex-col rounded">
          <span
            class="text-4xl text-red-500 border-b-2 border-zinc-900 pb-2 mb-2"
            >{{ counts.total.negative }}</span
          >
          <p class="text-xs text-zinc-400">{{ counts.monthly.negative }} {{ counts.monthly.negative == 1 ? 'ny' : 'nye' }} denne måned</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.trade-counter-sm {
  @apply text-zinc-400 grid grid-cols-5 place-items-center font-semibold;
}

.trade-counter-md {
  @apply w-full grid grid-cols-5 place-items-center bg-zinc-900 p-4 font-semibold rounded text-zinc-400;
}

.trade-counter-lg {
  @apply grid grid-cols-3 gap-4;
}
</style>
