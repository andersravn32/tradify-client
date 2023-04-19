<script setup>
const router = useRouter();
</script>

<template>
  <nav id="topnav">
    <ul>
      <li>
        <h2>{{ router.currentRoute.value.name }}</h2>
      </li>
    </ul>
    <ul>
      <li><div class="h-10 w-10 bg-zinc-800 rounded-full"></div></li>
    </ul>
  </nav>
</template>

<style>
#topnav {
  @apply fixed top-0 right-0 left-64 p-4 border-b-2 border-zinc-800 flex justify-between items-center;
}
</style>
