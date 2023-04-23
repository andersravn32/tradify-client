<script setup>
import useDataStore from "~/stores/DataStore";
import useAuthStore from "../../stores/AuthStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const dataStore = useDataStore();
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
  const { errors } = await authStore.signin(
    body.value.email,
    body.value.password
  );

  // Update loading state
  loading.value = false;

  if (errors) {
    errors.forEach((error) => {
      dataStore.addNotification("error", {
        msg: "Du har indtastet en forkert email eller password",
      });
    });
    return;
  }

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
