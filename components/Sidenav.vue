<script setup>
import {
  HomeIcon,
  ArrowsRightLeftIcon,
  UserIcon,
  Cog8ToothIcon,
  WrenchIcon,
} from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const authStore = useAuthStore();
</script>

<template>
  <nav id="sidenav">
    <NuxtLink id="logo-link" to="/dashboard">
      <Logo size="xs" />
    </NuxtLink>
    <div class="flex flex-col space-y-2">
      <span class="text-zinc-400 uppercase text-sm">Generelt</span>
      <ul class="flex flex-col">
        <li>
          <NuxtLink class="router-link" to="/dashboard">
            <HomeIcon class="h-6 w-6" />
            <span>Hjem</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="router-link" to="/profile">
            <UserIcon class="h-6 w-6" />
            <span>Min profil</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="router-link" to="/trades">
            <ArrowsRightLeftIcon class="h-6 w-6" />
            <span>Mine handler</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex flex-col space-y-2">
      <span class="text-zinc-400 uppercase text-sm">Konto</span>
      <ul class="flex flex-col">
        <li>
          <NuxtLink class="router-link" to="/settings">
            <Cog8ToothIcon class="h-6 w-6" />
            <span>Indstillinger</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div
      v-if="storeToRefs(authStore).user.value.role.permissionLevel >= 5"
      class="flex flex-col space-y-2"
    >
      <span class="text-zinc-400 uppercase text-sm">Administration</span>
      <ul class="flex flex-col">
        <li>
          <NuxtLink class="router-link" to="/settings">
            <WrenchIcon class="h-6 w-6" />
            <span>Administration</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
#sidenav {
  @apply fixed top-0 bottom-0 left-0 w-80 p-4 border-r-2 border-zinc-800 flex flex-col space-y-8 z-20;
}

#sidenav .router-link {
  @apply flex items-center space-x-4 p-4 rounded font-semibold text-sm text-zinc-400 hover:text-zinc-100;
}

#sidenav {
  @apply bg-transparent;
}

#sidenav .router-link-active,
#sidenav .router-link-exact-active {
  @apply text-zinc-100 bg-zinc-800;
}

#sidenav #logo-link {
  @apply bg-transparent;
}
</style>
