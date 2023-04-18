<script setup>
import useAuthStore from "../stores/AuthStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore)

definePageMeta({
    layout: "auth"
})

// Loading state
const loading = ref(false);

// Store credentials
const credentials = ref({
    email: null,
    password: null
})

// Main signin method
const signin = async () => {
    if (loading.value) {
        return;
    }

    // Update loading state
    loading.value = true;

    // Request signin
    const { data, errors } = await fetch("https://prod.tradify.dk/auth/provider/email/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials.value)
    })
        .then(res => res.json())

    // Update loading state
    loading.value = false;

    // Set accessToken cookie
    const accessToken = useCookie("accessToken");
    accessToken.value = data.accessToken;

    // Set refreshToken cookie
    const refreshToken = useCookie("refreshToken");
    refreshToken.value = data.refreshToken;

    // Set user object in store
    authStoreRefs.user.value = data.user;
}
</script>

<template>
    <section id="page-signin">
        <form id="form-signin" @submit.prevent="signin">
            <NuxtLink class="flex justify-center items-center" to="/">
                <Logo />
            </NuxtLink>
            <div class="border-2 border-zinc-800 p-4 rounded flex flex-col space-y-4">
                <Input type="email" placeholder="Indtast e-mail" label="E-mail" @input="e => credentials.email = e.value" />
                <Input type="password" placeholder="Indtast password" label="Password"
                    @input="e => credentials.password = e.value" />
                <Button :loading="loading">Log på</Button>
                <div class="flex justify-between items-center space-x-4">
                    <span class="border border-zinc-800 w-full"></span>
                    <span class="text-sm text-zinc-50/75">Eller</span>
                    <span class="border border-zinc-800 w-full"></span>
                </div>
            </div>
        </form>
    </section>
</template>

<style>
#page-signin {
    @apply grid place-items-center min-h-screen;
}

#form-signin {
    @apply w-full max-w-sm flex flex-col space-y-4;
}
</style>