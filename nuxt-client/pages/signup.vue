<script setup>
definePageMeta({
  layout: "auth",
  name: "Opret konto",
});
</script>

<template>
  <section id="page-signup">
    <FormSignup />
  </section>
</template>

<style>
#page-signup {
  @apply grid place-items-center min-h-screen text-zinc-50;
}
</style>
