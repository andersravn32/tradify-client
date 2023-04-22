<script setup>
import { BellIcon } from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

// Use auth store
const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
const modal = useModal();

// Use router
const router = useRouter();
</script>

<template>
  <nav id="topnav">
    <ul>
      <li>
        <h2>{{ router.currentRoute.value.name }}</h2>
      </li>
    </ul>
    <ul class="flex items-center space-x-8">
      <li><Button @click="modal.show = true; modal.currentModal='modal-form-trade-create'">Opret handel</Button></li>
      <li>
        <Button type="icon"><BellIcon class="w-6 h-6" /></Button>
      </li>
      <li class="text-zinc-700">|</li>
      <li>
        <UserSmall :user="authStoreRefs.user.value" />
      </li>
    </ul>
  </nav>
</template>

<style>
#topnav {
  @apply fixed top-0 right-0 left-80 p-4 border-b-2 border-zinc-800 flex justify-between items-center text-zinc-100 z-10;
}

#topnav .user {
  @apply flex-row-reverse space-x-0;
}

#topnav .user .user-avatar {
  @apply ml-4;
}

#topnav .user-card .user-avatar {
  @apply ml-auto;
}

#topnav .user .user-details {
  @apply text-right;
}

#topnav .user .user-details span:nth-of-type(1) {
  @apply flex-row-reverse space-x-0;
}

#topnav .user .user-details span:nth-of-type(1) span {
  @apply ml-2;
}
</style>
