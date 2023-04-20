<script setup>
definePageMeta({
  layout: "app",
  name: "Dashboard",
  middleware: "auth",
});
</script>

<template>
  <section id="page-dashboard">
    <FormTradeCreate />
  </section>
</template>
