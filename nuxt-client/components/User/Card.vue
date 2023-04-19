<script setup>
import {
    ArrowLeftOnRectangleIcon,
    QuestionMarkCircleIcon,
    UserIcon,
  } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// Use auth store
const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
</script>

<template>
  <div class="user-card">
    <div class="mx-auto bg-zinc-700 rounded-full h-32 w-32 bg-cover bg-center">
      <img
        class="h-full w-full"
        crossOrigin="anonymous"
        :src="`${user.profile.avatar}?token=${authStoreRefs.accessToken.value}`"
        alt="User avatar"
      />
    </div>
    <div class="flex flex-col items-center">
      <span class="font-semibold text-lg">{{ user.profile.firstName }}</span>
      <span class="text-sm text-zinc-400">@{{ user.identifier }}</span>
      <UserRole :role="user.role" />
    </div>
    <TradeCounter :trades="user.trades" :userId="user.uuid"/>
  </div>
</template>
