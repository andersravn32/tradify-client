<script setup>
const slots = useSlots();
const tabs = slots.default();

const selectedTitle = ref(tabs[0].props.title);

provide("selectedTitle", selectedTitle);
</script>

<template>
  <div class="tabs">
    <ul class="tabs-titles">
      <li
        v-for="tab in tabs"
        @click="selectedTitle = tab.props.title"
        class="tab-title"
        :class="{
          'tab-title-active': selectedTitle == tab.props.title,
          hidden: tab.props.hidden,
        }"
      >
        {{ tab.props.title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<style>
.tabs-titles {
  @apply flex items-center space-x-4 p-4 border-b-2 border-zinc-800;
}

.tab-title {
  @apply text-sm uppercase text-zinc-400 cursor-pointer hover:text-zinc-50 hover:bg-zinc-800 px-3 py-1 rounded;
}

.tab-title-active {
  @apply text-zinc-50 bg-zinc-800;
}

.tab {
  @apply flex flex-col p-4;
}
</style>
