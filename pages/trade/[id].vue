<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useTradeStore from "~/stores/TradeStore";

definePageMeta({
  layout: "app",
  name: "Handel",
  middleware: "auth",
});

const router = useRouter();
const tradeStore = useTradeStore();
const authStore = useAuthStore();

storeToRefs(tradeStore).trade.value = await tradeStore.load(
  router.currentRoute.value.params.id,
  true
);
</script>

<template>
  <section id="page-trade">
    <TradeHeader :trade="storeToRefs(tradeStore).trade.value" />
    <Tabs>
      <Tab title="Information">
        <TradeInformation :trade="storeToRefs(tradeStore).trade.value" />
      </Tab>
      <Tab
        title="Kommunikation"
        :hidden="
          !(
            storeToRefs(authStore).user.value.uuid ==
              storeToRefs(tradeStore).trade.value.from.uuid ||
            storeToRefs(authStore).user.value.uuid ==
              storeToRefs(tradeStore).trade.value.to.uuid
          )
        "
      >
        <TradeCommunication :trade="storeToRefs(tradeStore).trade.value" />
      </Tab>
    </Tabs>
  </section>
</template>
