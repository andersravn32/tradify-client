<script setup>
import { PencilIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useNotificationStore from "~/stores/NotificationStore";

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const runtimeConfig = useRuntimeConfig();

const showEdit = ref(false);

defineProps({
  url: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "md",
  },
  allowediting: {
    type: Boolean,
    default: false,
  },
});

const handleEvent = (e) => {
  if (e.type == "mouseenter") {
    showEdit.value = true;
  }

  if (e.type == "mouseleave") {
    showEdit.value = false;
  }
};

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
    msg: "Du har nu skiftet dit profilbillede. ",
  });
};
</script>

<template>
  <div
    class="user-avatar"
    :class="`user-avatar-${size}`"
    @mouseenter="handleEvent"
    @mouseleave="handleEvent"
  >
    <div class="h-full w-full relative">
      <img
        class="h-full w-full rounded-full"
        crossorigin="anonymous"
        :src="`${url}?token=${storeToRefs(authStore).accessToken.value}`"
        alt="User avatar"
      />
    </div>
  </div>
</template>

<style>
.user-avatar-xs {
  @apply h-6 w-6;
}

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
