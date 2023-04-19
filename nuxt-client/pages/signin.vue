<script setup>
definePageMeta({
  layout: "auth",
  name: "Log på",
});
</script>

<template>
  <section id="page-signin">
    <FormSignin />
  </section>
</template>

<style>
#page-signin {
  @apply grid place-items-center min-h-screen text-zinc-50;
}
</style>
