<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

definePageMeta({
  layout: "app",
  name: "Dashboard",
  middleware: "auth",
});

const authStore = useAuthStore();
const router = useRouter();
</script>

<template>
  <section id="page-dashboard">
    <div class="dashboard-header">
      <h2 class="text-zinc-50 text-4xl">
        Velkommen tilbage
        {{ storeToRefs(authStore).user.value.profile.firstName }}!
      </h2>
      <p class="text-zinc-400 mb-4">
        Du har i øjeblikket
        {{
          storeToRefs(authStore).user.value.trades.filter((trade) => {
            return (
              trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
              !(trade.to.confirmed === 1) &&
              !trade.completed
            );
          }).length
        }}
         {{ storeToRefs(authStore).user.value.trades.filter((trade) => {
            return (
              trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
              !(trade.to.confirmed === 1) &&
              !trade.completed
            );
          }).length == 1 ? 'ny handelsanmodning' : 'nye handelsanmodninger' }}.
      </p>
      <Button @click="router.push('/trades')">Mine handler</Button>
    </div>
    <div class="p-4 flex flex-col space-y-4">
      <h2 class="text-zinc-50">Mine bedømmelser</h2>
      <TradeCounter :trades="storeToRefs(authStore).user.value.trades" :uuid="storeToRefs(authStore).user.value.uuid" size="lg" />
    </div>
  </section>
</template>

<style>
.dashboard-header {
  @apply px-4 py-24 border-b-2 border-zinc-800;
}
</style>
