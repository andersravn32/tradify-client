<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useTradeStore from "~/stores/TradeStore";

const tradeStore = useTradeStore();
const authStore = useAuthStore();

const props = defineProps({
  trade: {
    type: Object,
    required: true,
  },
});

const trade = await tradeStore.load(props.trade._id);
</script>

<template>
  <div class="trade">
    <h3 class="text-sm text-zinc-50">{{ trade.title }}</h3>
    <span class="text-xs text-zinc-400 mb-2">ID: {{ trade._id }}</span>
    <User class="border-t-2 border-zinc-800 pt-2" :user="trade.from.uuid == storeToRefs(authStore).user.value.uuid ? trade.to : trade.from" size="xs" />
  </div>
</template>

<style>
.trade {
  @apply flex flex-col p-4 rounded;
}
</style>
