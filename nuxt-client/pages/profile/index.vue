<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

definePageMeta({
  layout: "app",
  name: "Min profil",
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <section id="page-profile">
    <UserProfile :user="storeToRefs(authStore).user.value" />
  </section>
</template>
