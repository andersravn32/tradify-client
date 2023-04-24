<script setup>
import {
  ArrowsRightLeftIcon,
  EllipsisHorizontalIcon,
  CalendarIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useNotificationStore from "~/stores/NotificationStore";
import useUserStore from "~/stores/UserStore";

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const user = await userStore.find(props.user.uuid);

</script>

<template>
  <div class="user-profile">
    <div class="user-profile-header">
      <UserCover :url="user.profile.cover" />
      <UserAvatar size="xl" :url="user.profile.avatar" />

      <div class="user-details">
        <div class="flex flex-col">
          <span
            class="text-2xl font-semibold text-zinc-50 flex items-center space-x-2"
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

        <div class="flex space-x-4">
          <DropdownButton position="left">
            <template #icon>
              <EllipsisHorizontalIcon class="h-6 w-6 text-zinc-50" />
            </template>
            <template #content>
              <ul class="flex flex-col space-y-2 w-32">
                <li>
                  <span class="router-link">
                    <PencilIcon class="h-5 w-5" />
                    <span>Rediger profil</span>
                  </span>
                </li>
              </ul>
            </template>
          </DropdownButton>
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
  @apply h-48;
}

.user-profile .user-avatar {
  @apply absolute -translate-y-1/2;
}

.user-profile .user-details {
  @apply mt-16 p-4 flex justify-between;
}

.user-profile .router-link {
  @apply font-semibold flex items-center space-x-2 text-zinc-400 hover:text-zinc-50 text-xs cursor-pointer;
}
</style>
