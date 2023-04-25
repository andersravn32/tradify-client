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
        <TradeList
          title="Anmodninger"
          :trades="storeToRefs(authStore).user.value.trades"
        />
      </Tab>
      <Tab title="Sendte">
        <TradeList title="Sendte" :trades="[]" />
      </Tab>
      <Tab title="Igangværende">
        <TradeList title="Igangværende" :trades="[]" />
      </Tab>
      <Tab title="Afsluttede">
        <TradeList title="Afsluttede" :trades="[]" />
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
