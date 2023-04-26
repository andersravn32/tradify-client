<script setup>
definePageMeta({
  layout: "app",
  name: "Indstillinger",
  middleware: "auth",
});
</script>

<template>
  <section id="page-settings">
    <Tabs>
      <Tab title="Profil">
        <div></div>
      </Tab>
      <Tab title="Notifikationer">
        <div></div>
      </Tab>
      <Tab title="API">
        <div></div>
      </Tab>
    </Tabs>
  </section>
</template>
