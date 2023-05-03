<script setup>
import { storeToRefs } from "pinia";
import useTradeStore from "~/stores/TradeStore";
import useNotificationStore from "~/stores/NotificationStore"
import useUserStore from "~/stores/UserStore";
import useAuthStore from "~/stores/AuthStore";

const router = useRouter();
const tradeStore = useTradeStore();
const userStore = useUserStore();
const authStore = useAuthStore();
</script>

<template>
  <div id="layout-app">
    <ModalOverlay>
      <Modal id="modal-form-trade-create">
        <FormTradeCreate :user="storeToRefs(userStore).user.value" />
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
    </div>
    <div id="extra">
      <Notifications />
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
