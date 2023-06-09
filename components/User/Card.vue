<script setup>
import {
  ArrowLeftOnRectangleIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useUserStore from "~/stores/UserStore";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  position: {
    type: String,
    default: "right",
  },
});

defineEmits(["close"]);

// Use auth store
const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();
const modal = useModal();

const user = await userStore.find(props.user.uuid);
</script>

<template>
  <Overlay @click="(e) => $emit('close', e)" />
  <div class="user-card" :class="`user-card-${position}`">
    <UserAvatar class="mx-auto" size="xl" :url="user.profile.avatar" />
    <div class="flex flex-col items-center">
      <span
        class="font-semibold text-lg text-zinc-50 flex items-center space-x-2"
        ><span>{{ user.profile.firstName }}</span>
        <CheckBadgeIcon v-if="user.verified" class="h-6 w-6 text-sky-500" />
      </span>
      <span class="text-sm text-zinc-400">@{{ user.identifier }}</span>
      <UserRole
        v-if="user.role.permissionLevel >= 3"
        class="mt-2"
        :role="user.role"
      />
    </div>
    <TradeCounter v-if="user.trades" :trades="user.trades" :uuid="user.uuid" />

    <ul
      class="flex flex-col space-y-4"
      v-if="storeToRefs(authStore).user.value.uuid == user.uuid"
    >
      <li>
        <NuxtLink class="router-link" to="/">
          <QuestionMarkCircleIcon class="h-6 w-6" /><span>F.A.Q</span>
        </NuxtLink>
      </li>
      <li>
        <Button
          type="tertiary"
          class="flex items-center space-x-2 signout"
          @click="
            () => {
              authStore.signout();
              router.push('/signin');
            }
          "
        >
          <ArrowLeftOnRectangleIcon class="h-6 w-6" /><span>Log ud</span>
        </Button>
      </li>
    </ul>
    <ul
      class="flex flex-col space-y-4"
      v-if="storeToRefs(authStore).user.value.uuid != user.uuid"
    >
      <li>
        <NuxtLink
          class="router-link"
          @click="
            (e) => {
              $emit('close', e);
              modal.currentModal = '';
              modal.show = false;
            }
          "
          :to="`/profile/${user.identifier}`"
        >
          <UserIcon class="h-6 w-6" /><span>Besøg profil</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style>
.user-card {
  @apply bg-zinc-800 shadow-lg w-64 absolute flex flex-col p-4 rounded space-y-4 z-20 cursor-default;
}

.user-card-right {
  @apply right-0 top-full;
}

.user-card-left {
  @apply left-0 top-full;
}

.user-card .router-link {
  @apply flex items-center space-x-2 rounded font-semibold text-sm text-zinc-400 hover:text-zinc-100;
}

.user-card .signout {
  @apply text-red-500 hover:text-red-600;
}
</style>
