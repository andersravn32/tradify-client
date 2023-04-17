<script setup>
definePageMeta({
    layout: "auth"
})
</script>

<template>
    <section id="page-signin">
        <form id="form-signin" @submit.prevent>
            <NuxtLink class="flex justify-center items-center" to="/">
                <Logo />
            </NuxtLink>
            <div class="border border-zinc-800 p-4 rounded"></div>
        </form>
    </section>
</template>

<style>
#page-signin {
    @apply grid place-items-center;
}

#form-signin {
    @apply w-full max-w-sm flex flex-col space-y-4;
}
</style>