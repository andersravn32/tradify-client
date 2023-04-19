<script setup>
import useAuthStore from "../../stores/AuthStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
const router = useRouter();

// Loading state
const loading = ref(false);

// Store credentials
const body = ref({
  email: null,
  password: null,
});

// Main signin method
const signin = async () => {
  if (loading.value || !(body.value.email && body.value.password)) {
    return;
  }

  // Update loading state
  loading.value = true;

  // Request signin
  const { data, errors } = await fetch(
    "https://prod.tradify.dk/auth/provider/email/signin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.value),
    }
  ).then((res) => res.json());

  // Update loading state
  loading.value = false;

  if (errors.length) {
    // TODO: Error handling
    return;
  }

  // Set accessToken cookie
  const accessToken = useCookie("accessToken");
  accessToken.value = data.accessToken;
  authStoreRefs.accessToken.value = data.accessToken;

  // Set refreshToken cookie
  const refreshToken = useCookie("refreshToken");
  refreshToken.value = data.refreshToken;
  authStoreRefs.refreshToken.value = data.refreshToken;

  // Set user object in store
  authStoreRefs.user.value = data.user;

  // Redirect to dashboard
  return router.push("/dashboard");
};
</script>

<template>
  <form id="form-signin" @submit.prevent="signin">
    <NuxtLink class="flex justify-center items-center" to="/">
      <Logo />
    </NuxtLink>
    <div class="border-2 border-zinc-800 p-8 rounded flex flex-col space-y-4">
      <h2 class="text-2xl">Log på</h2>
      <Input
        type="email"
        placeholder="Indtast e-mail"
        label="E-mail"
        @input="(e) => (body.email = e.value)"
      />
      <Input
        type="password"
        placeholder="Indtast password"
        label="Password"
        @input="(e) => (body.password = e.value)"
      />
      <div class="flex justify-end">
        <NuxtLink class="text-sm text-indigo-500 hover:text-indigo-600" to="/"
          >Glemt password?</NuxtLink
        >
      </div>
      <Button :loading="loading">Log på</Button>
      <div class="flex justify-between items-center space-x-4">
        <span class="border border-zinc-800 w-full"></span>
        <span class="text-sm text-zinc-400">Eller</span>
        <span class="border border-zinc-800 w-full"></span>
      </div>
      <Button @click.prevent="router.push('/signup')" type="secondary"
        >Opret konto</Button
      >
    </div>
  </form>
</template>

<style>
#form-signin {
  @apply w-full max-w-md flex flex-col space-y-4;
}
</style>
