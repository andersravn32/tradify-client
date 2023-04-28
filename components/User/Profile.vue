<script setup>
import {
  EllipsisHorizontalIcon,
  PencilIcon,
} from "@heroicons/vue/24/outline";
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useUserStore from "~/stores/UserStore";

const userStore = useUserStore();
const authStore = useAuthStore();
const modal = useModal();

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
      <UserCover
        :allowediting="storeToRefs(authStore).user.value.uuid == user.uuid"
        :url="user.profile.cover"
      />
      <UserAvatar
        :alloweditting="storeToRefs(authStore).user.value.uuid == user.uuid"
        size="xl"
        :url="user.profile.avatar"
      />

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
          <p
            v-if="user.profile.bio"
            class="text-sm w-full max-w-2xl mt-2 text-zinc-50"
          >
            {{ user.profile.bio }}
          </p>
        </div>

        <div class="flex space-x-4 items-center">
          <Button
            v-if="!(storeToRefs(authStore).user.value.uuid == user.uuid)"
            @click="
              storeToRefs(userStore).user.value = user;
              modal.currentModal = 'modal-form-trade-create';
              modal.show = true;
            "
            >Anmod</Button
          >
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
    <Tabs>
      <Tab title="Bedømmelser">
        <TradeCounter size="lg" :trades="user.trades" :uuid="user.uuid" />
      </Tab>
      <Tab title="Seneste handler">
        <TradeList :trades="[user.trades[0], user.trades[1]]" />
      </Tab>
    </Tabs>
  </div>
</template>

<style>
.user-profile {
  @apply flex flex-col;
}

.user-profile-header {
  @apply border-b-2 border-zinc-800;
}

.user-profile .user-profile-header .user-cover {
  @apply h-48;
}

.user-profile .user-profile-header .user-avatar {
  @apply absolute -translate-y-3/4 ml-4;
}

.user-profile .user-profile-header .user-details {
  @apply mt-8 p-4 flex justify-between;
}

.user-profile .router-link {
  @apply font-semibold flex items-center space-x-2 text-zinc-400 hover:text-zinc-50 text-xs cursor-pointer;
}

.user-profile .trade-list-header {
  @apply pt-0;
}
</style>
