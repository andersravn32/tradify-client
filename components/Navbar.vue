<script setup>
const router = useRouter();

</script>

<template>
    <header>
        <ul>
            <li>
                <NuxtLink to="/">
                    <Logo size="sm" />
                </NuxtLink>
            </li>
        </ul>
        <ul>
            <li>
                <NuxtLink class="router-link" to="/about">Om os</NuxtLink>
            </li>
            <li>
                <NuxtLink class="router-link" to="/services">Ydelser</NuxtLink>
            </li>
            <li>
                <NuxtLink class="router-link" to="/signin">Log på</NuxtLink>
            </li>
            <li>
                <Button @click="router.push('/signup')">Opret ny konto</Button>
            </li>
        </ul>
    </header>
</template>

<style>
header {
    @apply p-4 border-b border-b-zinc-800 flex justify-between;
}

header .router-link {
    @apply font-semibold text-sm text-zinc-100/75 hover:text-zinc-100;
}

header .router-link-active, header .router-link-exact-active {
    @apply text-zinc-100;
}

header ul {
    @apply flex items-center space-x-16;
}
</style>