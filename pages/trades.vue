<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

definePageMeta({
  layout: "app",
  name: "Handler",
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <section id="page-trades">
    <Tabs>
      <Tab title="Anmodninger">
        <TradeList title="Anmodninger" :trades="storeToRefs(authStore).user.value.trades.filter((trade) => {
          return trade.to.uuid == storeToRefs(authStore).user.value.uuid && !trade.to.confirmed && !trade.completed
        })" />
      </Tab>
      <Tab title="Sendte">
        <TradeList title="Sendte" :trades="storeToRefs(authStore).user.value.trades.filter((trade) => {
            return trade.from.uuid == storeToRefs(authStore).user.value.uuid && !trade.to.confirmed && !trade.completed
          })" />
      </Tab>
      <Tab title="Igangværende">
        <TradeList title="Igangværende" :trades="storeToRefs(authStore).user.value.trades.filter((trade) => {
            return trade.from.confirmed && trade.to.confirmed && !trade.completed
          })" />
      </Tab>
      <Tab title="Afsluttede">
        <TradeList title="Afsluttede" :trades="storeToRefs(authStore).user.value.trades.filter((trade) => {
            return trade.from.confirmed && trade.to.confirmed && trade.completed
          })" />
      </Tab>
    </Tabs>
  </section>
</template>

<style>
#page-trades {
  @apply flex flex-col;
}

#page-trades .tab {
  @apply p-0;
}
</style>
