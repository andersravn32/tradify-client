<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

definePageMeta({
  layout: "app",
  name: "Profil",
  middleware: "auth",
});

const router = useRouter();
const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();

const { data, errors } = await fetch(
  `${runtimeConfig.backendUrl}/users/${router.currentRoute.value.params.identifier}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: storeToRefs(authStore).accessToken.value,
    },
  }
).then((res) => res.json());
</script>

<template>
  <section id="page-profile">
    <UserProfile :user="data[0]" />
  </section>
</template>
