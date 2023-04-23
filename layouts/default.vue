<script setup>
import { storeToRefs } from "pinia";
import useDataStore from "~/stores/DataStore";

const dataStore = useDataStore();
</script>

<template>
  <div id="layout-default">
    <div id="navigation">
      <Navbar />
    </div>
    <div id="extra">
      <Notifications v-if="storeToRefs(dataStore).notifications.value.length" />
    </div>
    <div id="content">
      <slot />
    </div>
  </div>
</template>
