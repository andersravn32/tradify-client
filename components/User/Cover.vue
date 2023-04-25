<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  url: {
    type: String,
    default: null,
  },
  allowediting: {
    type: Boolean,
    default: false,
  },
});

const handleUpload = async (e) => {
  if (!e.target.files[0]) {
    return;
  }

  const formData = new FormData();
  formData.append("avatar", e.target.files[0]);
  await fetch(
    `${runtimeConfig.public.backendUrl}/user/${
      storeToRefs(authStore).user.value.uuid
    }/profile/avatar`,
    {
      method: "PUT",
      headers: {
        Authorization: storeToRefs(authStore).accessToken.value,
      },
      body: formData,
    }
  ).then((res) => res.json());

  notificationStore.add("info", {
    msg: "Du har nu skiftet dit coverbillede. ",
  });
};
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
