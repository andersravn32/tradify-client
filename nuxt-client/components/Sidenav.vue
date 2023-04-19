<script setup>
import {
  HomeIcon,
  ArrowsRightLeftIcon,
  UserIcon,
  Cog8ToothIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <nav id="sidenav">
    <NuxtLink id="logo-link" to="/dashboard">
      <Logo size="xs" />
    </NuxtLink>
    <ul class="flex flex-col space-y-4">
      <li>
        <NuxtLink class="router-link" to="/dashboard">
          <HomeIcon class="h-6 w-6" />
          <span>Hjem</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="router-link" to="/trades">
          <ArrowsRightLeftIcon class="w-6 h-6" />
          <span>Mine handler</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="router-link" to="/profile">
          <UserIcon class="h-6 w-6" />
          <span>Min profil</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="router-link" to="/settings">
          <Cog8ToothIcon class="h-6 w-6" />
          <span>Indstillinger</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style>
#sidenav {
  @apply fixed top-0 bottom-0 left-0 w-64 p-4 border-r-2 border-zinc-800 flex flex-col space-y-8;
}

#sidenav .router-link {
  @apply flex items-center space-x-4 px-6 py-2 rounded font-semibold text-sm text-zinc-400 hover:text-zinc-100;
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
