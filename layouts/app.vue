<script setup>
import { storeToRefs } from "pinia";
import useTradeStore from "~/stores/TradeStore";
import useNotificationStore from "~/stores/NotificationStore"

const tradeStore = useTradeStore();
const notificationStore = useNotificationStore()
</script>

<template>
  <div id="layout-app">
    <ModalOverlay>
      <Modal id="modal-form-trade-create">
        <FormTradeCreate />
      </Modal>
      <Modal id="modal-form-trade-respond">
        <FormTradeRespond :trade="storeToRefs(tradeStore).trade.value" />
      </Modal>
      <Modal id="modal-form-trade-rate">
        <FormTradeRate :trade="storeToRefs(tradeStore).trade.value" />
      </Modal>
    </ModalOverlay>
    <div id="navigation">
      <Topnav />
      <Sidenav />
      <Sidebar />
    </div>
    <div id="extra">
      <Notifications v-if="storeToRefs(notificationStore).notifications.value.length"/>
    </div>
    <div id="content">
      <slot />
    </div>
  </div>
</template>

<style>
#layout-app #content {
  @apply pl-80 pt-[74px] pr-80 min-h-screen;
}
</style>
