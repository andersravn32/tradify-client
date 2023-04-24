<script setup>
import { storeToRefs } from "pinia";
import useNotificationStore from "~/stores/NotificationStore";

const notificationStore = useNotificationStore();
</script>

<template>
  <div id="layout-auth">
    <div id="extra">
      <Notifications v-if="storeToRefs(notificationStore).notifications.value.length" />
    </div>
    <div id="content">
      <slot />
    </div>
  </div>
</template>
