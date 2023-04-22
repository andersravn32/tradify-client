<script setup>
defineProps({
  trades: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <ul class="trade-list">
    <li class="text-sm uppercase text-zinc-400 grid grid-cols-5 gap-4 p-4 border-b-2 border-zinc-800">
      <span>Titel</span><span>Kategori</span><span>Afsender</span
      ><span>Modtager</span><span>Handling</span>
    </li>
    <TradeListItem v-for="trade in trades" :trade="trade" />
  </ul>
</template>

<style>
.trade-list {
  @apply flex flex-col;
}

.trade-list-item {
  @apply p-4;
}

.trade-list-item:nth-of-type(odd){
  @apply bg-zinc-800/25 p-4;
}
</style>
