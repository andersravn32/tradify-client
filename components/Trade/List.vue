<script setup>
import useAuthStore from '~/stores/AuthStore';

const authStore = useAuthStore();

defineProps({
  trades: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
  },
});
</script>

<template>
  <div class="trade-list">
    <div v-if="title" class="trade-list-title">
    <h2 class="text-zinc-50 text-2xl">{{title}}</h2>
    <Button type="tertiary" @click="authStore.refresh()">Opdater</Button>
  </div>
  <ul>
    <li
      class="text-sm uppercase text-zinc-400 grid grid-cols-5 gap-4 p-4 border-b-2 border-zinc-800"
    >
      <span>Titel</span><span>Kategori</span><span>Afsender</span
      ><span>Modtager</span><span>Handling</span>
    </li>
    <TradeListItem v-for="trade in trades" :trade="trade" />
  </ul>
  </div>

</template>

<style>
.trade-list-title{
  @apply p-4 flex items-center justify-between border-b-2 border-zinc-800
}

.trade-list ul {
  @apply flex flex-col;
}

.trade-list-item {
  @apply p-4;
}

.trade-list-item:nth-of-type(odd) {
  @apply bg-zinc-800/25 p-4;
}
</style>
