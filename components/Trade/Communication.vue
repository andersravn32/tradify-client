<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const props = defineProps({
  trade: {
    type: Object,
    required: true,
  },
});

const { $socket } = useNuxtApp();
const authStore = useAuthStore();

onMounted(() => {
  $socket.emit("trade-join", {
    uuid: storeToRefs(authStore).user.value.uuid,
    trade: props.trade._id,
  });
});

onUnmounted(() => {
  $socket.emit("trade-leave", {
    uuid: storeToRefs(authStore).user.value.uuid,
    trade: props.trade._id,
  });
});
</script>

<template>
  <div class="trade-communication">
    <ul class="col-span-2"></ul>
    <div class="flex flex-col space-y-4">
      <h3 class="text-zinc-50">Deltagere</h3>
      <User :user="props.trade.from" />
      <User :user="props.trade.to" />
    </div>
  </div>
</template>

<style>
.trade-communication {
  @apply grid grid-cols-3;
}
</style>
