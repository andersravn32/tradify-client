<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useDataStore from "~/stores/DataStore";

definePageMeta({
  layout: "app",
  name: "Handel",
  middleware: "auth",
});

const router = useRouter();
const dataStore = useDataStore();

const trade = await dataStore.loadTrade(router.currentRoute.value.params.id, true);
</script>

<template>
  <section id="page-trade">
    <TradeHeader :trade="trade" />
  </section>
</template>
