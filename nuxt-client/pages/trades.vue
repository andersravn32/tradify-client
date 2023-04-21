<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

definePageMeta({
  layout: "app",
  name: "Handler",
  middleware: "auth",
});

const authStore = useAuthStore();

const incomingTrades = storeToRefs(authStore).user.value.trades.filter(
  (trade) => {
    return (
      trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
      !trade.to.confirmed &&
      !trade.completed
    );
  }
);

const ongoingTrades = storeToRefs(authStore).user.value.trades.filter(
  (trade) => {
    return (
      trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
      trade.to.confirmed &&
      !trade.completed
    );
  }
);

const completedTrades = storeToRefs(authStore).user.value.trades.filter(
  (trade) => {
    return (
      trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
      trade.to.confirmed &&
      trade.completed
    );
  }
);

console.log(incomingTrades, ongoingTrades, completedTrades);
</script>

<template>
  <section id="page-trades">
    <TradeList :trades="storeToRefs(authStore).user.value.trades" />
  </section>
</template>
