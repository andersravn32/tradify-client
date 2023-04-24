<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const authStore = useAuthStore();

const props = defineProps({
  url: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <div class="user-cover" @mouseenter="handleEvent" @mouseleave="handleEvent">
    <img
      v-if="url"
      class="h-full w-full object-cover"
      crossorigin="anonymous"
      :src="`${url}?token=${storeToRefs(authStore).accessToken.value}`"
      alt="User avatar"
    />
    <div
      v-if="!url"
      class="h-full w-full object-cover user-cover-standin"
    ></div>
  </div>
</template>

<style>
.user-cover {
  @apply w-full relative;
}

.user-cover-standin {
  @apply bg-indigo-500;
}
</style>
