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
const router = useRouter();
</script>

<template>
  <div class="user-card">
    <UserAvatar
      class="mx-auto"
      size="xl"
      :url="authStoreRefs.user.value.profile.avatar"
    />
    <div class="flex flex-col items-center">
      <span class="font-semibold text-lg">{{ user.profile.firstName }}</span>
      <span class="text-sm text-zinc-400">@{{ user.identifier }}</span>
      <UserRole :role="user.role" />
    </div>
    <TradeCounter :trades="user.trades" :userId="user.uuid" />

    <ul v-if="authStoreRefs.user.value.uuid == user.uuid">
      <li>
        <Button
          type="tertiary"
          class="flex items-center space-x-2"
          @click="
            () => {
              authStore.signout();
              router.push('/signin');
            }
          "
          ><ArrowLeftOnRectangleIcon class="h-6 w-6" /><span
            >Log ud</span
          ></Button
        >
      </li>
    </ul>
  </div>
</template>
