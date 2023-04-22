<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";

defineProps({
  user: {
    type: Object,
    required: true,
  },
  direction: {
    type: String,
    default: "ltr",
  },
});

const showUserCard = ref(false);

const displayUserCard = (e) => {
  if (!showUserCard.value && e.target.className != "overlay") {
    showUserCard.value = true;
  }
};

const hideUserCard = (e) => {
  if (showUserCard.value) {
    showUserCard.value = false;
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
          <span>{{ user.profile.firstName }}</span
          ><CheckBadgeIcon v-if="user.verified" class="h-5 w-5 text-sky-500" />
        </span>
        <span class="text-xs text-zinc-400"> @{{ user.identifier }} </span>
      </div>
      <UserAvatar
        v-if="direction == 'rtl'"
        size="sm"
        :url="user.profile.avatar"
      />
    </div>
    <UserCard v-if="showUserCard" @close="hideUserCard" :user="user" />
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
