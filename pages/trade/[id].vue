<script setup>
import { storeToRefs } from "pinia";
import useDataStore from "~/stores/DataStore";

definePageMeta({
  layout: "app",
  name: "Handel",
  middleware: "auth",
});

const router = useRouter();
const dataStore = useDataStore();

storeToRefs(dataStore).trade.value = await dataStore.loadTrade(router.currentRoute.value.params.id, true);
</script>

<template>
  <section id="page-trade">
    <TradeHeader :trade="storeToRefs(dataStore).trade.value" />
    <Tabs>
      <Tab title="Information">
        <TradeInformation :trade="storeToRefs(dataStore).trade.value"/>
      </Tab>
      <Tab title="Kommunikation">

      </Tab>
    </Tabs>
  </section>
</template>