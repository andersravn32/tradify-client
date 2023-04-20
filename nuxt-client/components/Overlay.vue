<template>
  <div class="overlay">
    <slot />
  </div>
</template>

<style>
.overlay {
  @apply fixed top-0 left-0 right-0 bottom-0 bg-zinc-900/30 z-10 cursor-default;
}
</style>
