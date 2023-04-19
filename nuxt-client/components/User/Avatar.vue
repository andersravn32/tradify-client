<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);

defineProps({
  url: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    default: "md",
  },
});
</script>

<template>
  <div class="user-avatar" :class="`user-avatar-${size}`">
    <img
      class="h-full w-full"
      crossorigin="anonymous"
      :src="`${url}?token=${authStoreRefs.accessToken.value}`"
      alt="User avatar"
    />
  </div>
</template>

<style>
.user-avatar-sm {
  @apply h-10 w-10;
}

.user-avatar-md {
  @apply h-16 w-16;
}

.user-avatar-lg {
  @apply h-24 w-24;
}

.user-avatar-xl {
  @apply h-32 w-32;
}

.user-avatar {
  @apply bg-zinc-700 rounded-full place-items-center object-cover;
}
</style>
