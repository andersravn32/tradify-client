<script setup>
import useAuthStore from "../../stores/AuthStore";
import { storeToRefs } from "pinia";

const authStore = await useAuthStore();
const authStoreRefs = storeToRefs(authStore);
const router = useRouter();

// Loading state
const loading = ref(false);

const body = ref({
  identifier: null,
  email: null,
  password: null,
});

const signup = async () => {
  if (
    loading.value ||
    !(body.value.email && body.value.password && body.value.identifier)
  ) {
    return;
  }

  // Update loading state
  loading.value = true;

  const { data, errors } = await fetch(
    "https://prod.tradify.dk/auth/provider/email/signup",
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

  // Set refreshToken cookie
  const refreshToken = useCookie("refreshToken");
  refreshToken.value = data.refreshToken;

  // Set user object in store
  authStoreRefs.user.value = data.user;

  // Redirect to dashboard
  return router.push("/dashboard");
};
</script>

<template>
  <form id="form-signup" @submit.prevent="signup">
    <NuxtLink class="flex justify-center items-center" to="/">
      <Logo />
    </NuxtLink>
    <div class="border-2 border-zinc-800 rounded p-8 flex flex-col space-y-4">
      <h2 class="text-2xl">Opret konto</h2>
      <Input type="text" placeholder="Indtast brugernavn" label="Brugernavn" />
      <Input type="email" placeholder="Indtast e-mail" label="E-mail" />
      <Input type="password" placeholder="Indtast password" label="Password" />
      <p class="text-sm text-zinc-400">
        Ved at oprette en konto acceptere du Tradify's
        <a class="text-indigo-500 hover:text-indigo-600" href="#"
          >vilkår og betingelser</a
        >
      </p>
      <Button>Opret konto</Button>
      <p class="text-center text-sm text-zinc-400">
        Har du allerede en konto?
        <NuxtLink class="text-indigo-500 hover:text-indigo-600" to="/signin"
          >Log på</NuxtLink
        >
      </p>
    </div>
  </form>
</template>

<style>
#form-signup {
  @apply w-full max-w-md flex flex-col space-y-4;
}
</style>
