<script setup>
defineProps({
  role: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col items-start">
    <span
      v-if="role.permissionLevel == 3"
      class="border border-indigo-500 rounded-full text-indigo-500 px-3 py-1 text-sm font-semibold"
      >{{ role.title }}</span
    >
    <span
      v-if="role.permissionLevel == 4"
      class="border border-amber-500 rounded-full text-amber-500 px-3 py-1 text-sm font-semibold"
      >{{ role.title }}</span
    >
    <span
      v-if="role.permissionLevel >= 5"
      class="border border-red-500 rounded-full text-red-500 px-3 py-1 text-sm font-semibold"
      >{{ role.title }}</span
    >
  </div>
</template>
