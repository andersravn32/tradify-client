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
});
</script>

<template>
  <div class="user-cover">
    <img
      class="h-full w-full object-cover"
      crossorigin="anonymous"
      :src="`${url}?token=${authStoreRefs.accessToken.value}`"
      alt="User avatar"
    />
    <slot />
  </div>
</template>

<style>
.user-cover {
  @apply w-full relative;
}
</style>
