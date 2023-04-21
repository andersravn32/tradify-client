<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const showUserCard = ref(false);
const handleClick = (e) => {
  if (e.target.className != "overlay") {
    showUserCard.value = true;
  }
};
</script>

<template>
  <div class="user" @click="handleClick">
    <UserAvatar size="sm" :url="user.profile.avatar" />
    <div class="user-details">
      <span class="text-sm font-semibold text-zinc-50 flex items-center space-x-2">
        <span>{{ user.profile.firstName }}</span><CheckBadgeIcon v-if="user.verified" class="h-5 w-5 text-sky-500"
      />
      </span>
      <span class="text-xs text-zinc-400"> @{{ user.identifier }} </span>
    </div>
    <UserCard v-if="showUserCard" @close="showUserCard = false" :user="user" />
  </div>
</template>

<style>
.user {
  @apply flex items-center space-x-4 relative cursor-pointer;
}

.user .user-details{
    @apply flex flex-col;
}
</style>
