<script setup>
import { storeToRefs } from "pinia";
import useDataStore from "~/stores/DataStore";
const dataStore = useDataStore();
</script>

<template>
  <div id="layout-app">
    <ModalOverlay>
      <Modal id="modal-form-trade-create">
        <FormTradeCreate />
      </Modal>
      <Modal id="modal-form-trade-respond">
        <FormTradeRespond :trade="storeToRefs(dataStore).trade.value" />
      </Modal>
      <Modal id="modal-form-trade-rate">
        <FormTradeRate :trade="storeToRefs(dataStore).trade.value" />
      </Modal>
    </ModalOverlay>
    <div id="navigation">
      <Sidenav />
      <Topnav />
    </div>
    <div id="extra">
      <Sidebar />
    </div>
    <div id="content">
      <slot />
    </div>
  </div>
</template>

<style>
#layout-app #content {
  @apply pl-80 pt-[74px] pr-80;
}
</style>
