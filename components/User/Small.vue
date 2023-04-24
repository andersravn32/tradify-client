<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import useDataStore from "~/stores/DataStore";

const dataStore = useDataStore();

defineProps({
  user: {
    type: Object,
    required: true,
  },
  direction: {
    type: String,
    default: "ltr",
  },
  cardPosition: {
    type: String,
    default: "right"
  }
});

const showUserCard = ref(false);
const notificationBuffer = ref([]);

const displayUserCard = (e) => {
  if (!showUserCard.value && e.target.className != "overlay") {
    showUserCard.value = true;
    notificationBuffer.value = storeToRefs(dataStore).notifications.value;
    storeToRefs(dataStore).notifications.value = [];
  }
};

const hideUserCard = (e) => {
  if (showUserCard.value) {
    showUserCard.value = false;
    notificationBuffer.value.forEach((notification) => {
      dataStore.addNotification(
        notification.type,
        notification.data,
        notification.timeout
      );
    });
  }
};
</script>

<template>
  <div class="user">
    <div
      @click="displayUserCard"
      class="flex items-center space-x-4 cursor-pointer"
    >
      <UserAvatar
        v-if="direction == 'ltr'"
        size="sm"
        :url="user.profile.avatar"
      />
      <div class="user-details" :class="`user-details-${direction}`">
        <span
          class="text-sm font-semibold text-zinc-50 flex items-center space-x-2"
        >
          <CheckBadgeIcon
            v-if="user.verified && direction == 'rtl'"
            class="h-5 w-5 text-sky-500"
          />
          <span>{{ user.profile.firstName }}</span
          ><CheckBadgeIcon
            v-if="user.verified && direction == 'ltr'"
            class="h-5 w-5 text-sky-500"
          />
        </span>
        <span class="text-xs text-zinc-400"> @{{ user.identifier }} </span>
      </div>
      <UserAvatar
        v-if="direction == 'rtl'"
        size="sm"
        :url="user.profile.avatar"
      />
    </div>
    <UserCard v-if="showUserCard" @close="hideUserCard" :user="user" :position="cardPosition"/>
  </div>
</template>

<style>
.user {
  @apply relative;
}

.user .user-details {
  @apply flex flex-col;
}

.user .user-details-rtl {
  @apply text-right;
}
</style>
