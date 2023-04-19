<script setup>
import useAuthStore from "./stores/AuthStore";

const authStore = useAuthStore();
const refreshToken = useCookie("refreshToken");

if (refreshToken.value) {
  await authStore.refresh()
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
