<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const showUserCard = ref(false);
const handleClick = (e) => {
  if (e.target.className != "overlay") {
    showUserCard.value = true;
  }
};
</script>

<template>
  <div class="user" @click="handleClick">
    <UserAvatar size="sm" :url="user.profile.avatar" />
    <div class="user-details">
      <span class="text-sm font-semibold text-zinc-50">
        {{ user.profile.firstName }}
      </span>
      <span class="text-xs text-zinc-400"> @{{ user.identifier }} </span>
    </div>
    <UserCard v-if="showUserCard" @close="showUserCard = false" :user="user" />
  </div>
</template>

<style>
.user {
  @apply flex items-center space-x-4 relative cursor-pointer;
}

.user .user-details{
    @apply flex flex-col;
}
</style>
