<template>
    <div id="sidebar">
        <h2 class="text-2xl text-zinc-50">Nyheder</h2>
        <div class="p-4 bg-zinc-800 h-48 rounded flex items-center justify-center">
            <p class="text-zinc-400">Fandt ingen nyheder</p>
        </div>
    </div>
</template>

<style>
#sidebar {
    @apply fixed top-[74px] bottom-0 right-0 w-80 border-l-2 border-zinc-800 p-4 flex flex-col space-y-4;
}
</style>