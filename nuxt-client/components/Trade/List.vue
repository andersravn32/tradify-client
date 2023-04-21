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
    <li class="text-sm uppercase text-zinc-400 grid grid-cols-5 gap-4">
      <span>Titel</span><span>Kategori</span><span>Afsender</span
      ><span>Modtager</span><span>Handling</span>
    </li>
    <TradeListItem v-for="trade in trades" :trade="trade" />
  </ul>
</template>

<style>
.trade-list {
  @apply flex flex-col space-y-4;
}
</style>
