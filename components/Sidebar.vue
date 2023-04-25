<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useTradeStore from "~/stores/TradeStore";

const authStore = useAuthStore();
const tradeStore = useTradeStore();
</script>

<template>
  <aside id="sidebar">
    <h2 class="text-zinc-50">Mine handler</h2>
    <div class="flex flex-col space-y-2">
      <label class="text-sm uppercase text-zinc-400">Igangværende</label>
      <TradeListSmall :trades="storeToRefs(authStore).user.value.trades" />
    </div>
    <label class="text-sm uppercase text-zinc-400">Afsluttede</label>
  </aside>
</template>

<style>
#sidebar {
  @apply fixed z-10 top-[74px] right-0 bottom-0 w-80 border-l-2 border-zinc-800 flex flex-col space-y-4;
}
</style>
