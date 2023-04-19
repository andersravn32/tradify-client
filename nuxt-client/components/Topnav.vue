<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

// Use auth store
const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);

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
      <li><Button>Opret handel</Button></li>
      <li>
        <div class="user">
          <div class="flex flex-col text-right">
            <span class="text-sm font-semibold">{{
              authStoreRefs.user.value.profile.firstName
            }}</span>
            <span class="text-xs text-zinc-400"
              >@{{ authStoreRefs.user.value.identifier }}</span
            >
          </div>
          <UserAvatar size="sm" :url="authStoreRefs.user.value.profile.avatar" />
          <UserCard :user="authStoreRefs.user.value"/>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style>
#topnav {
  @apply fixed top-0 right-0 left-64 p-4 border-b-2 border-zinc-800 flex justify-between items-center text-zinc-100;
}

.user {
  @apply flex items-center space-x-4 relative;
}

.user-card {
  @apply bg-zinc-800 shadow-lg w-64 absolute right-0 top-full flex flex-col p-4 rounded space-y-4;
}

.user-card .router-link {
  @apply flex items-center space-x-4 rounded font-semibold text-sm text-zinc-400 hover:text-zinc-100;
}

.user-card .signout {
  @apply text-red-500 hover:text-red-600;
}
</style>
