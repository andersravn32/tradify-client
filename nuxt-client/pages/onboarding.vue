<script setup>
definePageMeta({
  layout: "auth",
  name: "Onboarding",
});
</script>

<template>
  <section id="page-onboarding">
    <FormOnboarding />
  </section>
</template>

<style>
#page-onboarding {
  @apply grid place-items-center min-h-screen text-zinc-50;
}
</style>