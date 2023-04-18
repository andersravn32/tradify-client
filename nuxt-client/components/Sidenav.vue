<template>
    <nav id="sidenav">
        <NuxtLink to="/dashboard">
            <Logo size="xs" />
        </NuxtLink>
    </nav>
</template>

<style>
#sidenav {
    @apply fixed top-0 bottom-0 left-0 w-64 p-4 border-r-2 border-zinc-800;
}
</style>