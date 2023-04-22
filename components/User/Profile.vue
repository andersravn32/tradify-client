<script setup>
import {
  ArrowsRightLeftIcon,
  EllipsisHorizontalIcon,
  CalendarIcon,
} from "@heroicons/vue/24/outline";
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
const user = ref({
  ...props.user,
});

if (!user.value.trades) {
  const { data, errors } = await fetch(
    `${runtimeConfig.public.backendUrl}/user/${user.value.uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: storeToRefs(authStore).accessToken.value,
      },
    }
  ).then((res) => res.json());
  user.value = data;
}
</script>

<template>
  <div class="user-profile">
    <div class="user-profile-header">
      <UserCover :url="user.profile.cover">
        <UserAvatar class="shadow-lg" size="xl" :url="user.profile.avatar"
      /></UserCover>
      <div class="flex items-center justify-between px-4">
        <div class="user-details">
          <span
            class="text-2xl pt-2 font-semibold text-zinc-50 flex items-center space-x-2"
            ><span>{{ user.profile.firstName }}</span>
            <CheckBadgeIcon v-if="user.verified" class="h-6 w-6 text-sky-500"
          /></span>
          <span class="text-zinc-400">@{{ user.identifier }}</span>
          <UserRole
            v-if="user.role.permissionLevel >= 3"
            class="mt-2"
            :role="user.role"
          />
        </div>
        <div class="user-options">
          <Button type="icon"
            ><EllipsisHorizontalIcon class="h-6 w-6 text-zinc-50"
          /></Button>
          <Button type="secondary">Kontakt</Button>
          <Button>Anmod</Button>
        </div>
      </div>
    </div>
    <ul
      class="flex flex-col space-y-2 mx-4 pt-4 text-xs border-t-2 border-zinc-800"
    >
      <li class="text-zinc-400 flex items-center space-x-2">
        <ArrowsRightLeftIcon class="h-6 w-6" />
        <span>Handler:</span>
        <TradeCounter size="sm" :trades="user.trades" :uuid="user.uuid" />
      </li>
      <li class="text-zinc-400 flex items-center space-x-2">
        <CalendarIcon class="h-6 w-6" />
        <span>Medlem siden:</span>
        <span>{{ new Date().toISOString().split("T")[0] }}</span>
      </li>
    </ul>
  </div>
</template>

<style>
.user-profile {
  @apply flex flex-col space-y-4;
}

.user-profile .user-cover {
  @apply h-48 mb-8;
}

.user-profile .user-cover .user-avatar {
  @apply absolute left-4 -bottom-8;
}

.user-profile .user-details {
  @apply flex flex-col items-start;
}

.user-profile .user-options {
  @apply flex items-center space-x-4;
}
</style>
