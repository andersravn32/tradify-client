<script setup>
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import useDataStore from "~/stores/DataStore";

const router = useRouter();

const dataStore = useDataStore();
</script>

<template>
  <ul
    :class="`notifications notifications-${router.currentRoute.value.meta.layout}`"
  >
    <li
      v-for="(notification, index) in storeToRefs(dataStore).notifications
        .value"
      :class="`notification notification-${notification.type}`"
      :key="index"
      @click="storeToRefs(dataStore).notifications.value.splice(index, 1)"
    >
      <ExclamationCircleIcon
        v-if="notification.type == 'error'"
        class="h-8 w-8"
      />
      <InformationCircleIcon
        v-if="notification.type == 'info'"
        class="h-8 w-8"
      />
      <CheckCircleIcon v-if="notification.type == 'success'" class="h-8 w-8" />

      <div class="notification-content">
        <h3 v-if="notification.type == 'error'">
          {{
            notification.data.title
              ? notification.data.title
              : "Der er opstået en fejl"
          }}
        </h3>
        <h3 v-if="notification.type == 'info'">
          {{ notification.data.title ? notification.data.title : "Info" }}
        </h3>
        <h3 v-if="notification.type == 'success'">
          {{ notification.data.title ? notification.data.title : "Success" }}
        </h3>
        <p>{{ notification.data.msg }}</p>
      </div>
    </li>
  </ul>
</template>

<style>
.notifications {
  @apply space-y-4 fixed z-20 flex flex-col;
}

.notification {
  @apply w-full p-4 rounded-md border-2 flex items-center space-x-4 cursor-pointer shadow-lg;
}

.notification-content {
    @apply flex flex-col max-w-xs
}

.notification-content h3{
    @apply text-sm;
}

.notification-content p{
    @apply text-xs;
}

.notification-error {
  @apply bg-red-500 text-red-900 border-red-900;
}

.notification-info {
  @apply bg-zinc-800 border-zinc-800 text-zinc-400;
}

.notification-info h3{
    @apply text-zinc-50;
}

.notification-info p{
    @apply text-zinc-400;
}

.notification-success {
  @apply bg-green-500 text-green-900 border-green-900;
}

.notifications-auth {
  @apply fixed bottom-4 left-1/2 -translate-x-1/2;
}

.notifications-app {
  @apply fixed top-[74px] mt-4 right-4;
}
</style>
