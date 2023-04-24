<script setup>
import { storeToRefs } from "pinia";
import useTradeStore from "~/stores/TradeStore";

definePageMeta({
  layout: "app",
  name: "Handel",
  middleware: "auth",
});

const router = useRouter();
const tradeStore = useTradeStore();

storeToRefs(tradeStore).trade.value = await tradeStore.load(router.currentRoute.value.params.id, true);
</script>

<template>
  <section id="page-trade">
    <TradeHeader :trade="storeToRefs(tradeStore).trade.value" />
    <Tabs>
      <Tab title="Information">
        <TradeInformation :trade="storeToRefs(tradeStore).trade.value"/>
      </Tab>
      <Tab title="Kommunikation">

      </Tab>
    </Tabs>
  </section>
</template>