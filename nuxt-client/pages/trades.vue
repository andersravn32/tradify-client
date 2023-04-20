<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

definePageMeta({
  layout: "app",
  name: "Handler",
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <section id="page-trades">
    <pre v-for="trade in storeToRefs(authStore).user.value.trades">{{ JSON.stringify(trade) }}</pre>
  </section>
</template>
