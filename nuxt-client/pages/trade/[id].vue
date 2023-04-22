<script setup>
import { storeToRefs } from 'pinia';
import useAuthStore from '~/stores/AuthStore';

definePageMeta({
  layout: "app",
  name: "Handel",
  middleware: "auth",
});

const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();
const router = useRouter();
const modal = useModal();

const { data, error } = await fetch(
  `${runtimeConfig.public.backendUrl}/trade/${router.currentRoute.value.params.id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: storeToRefs(authStore).accessToken.value,
    },
  }
).then((res) => res.json());

const trade = ref(data);
</script>

<template>
  <section id="page-trade">
    <TradeHeader :trade="trade" />
  </section>
</template>
