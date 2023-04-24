<script setup>
import useAuthStore from "../../stores/AuthStore";
import useNotificationStore from "~/stores/NotificationStore";

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
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

  // Perform signup through authStore
  const { data, errors } = await authStore.signup(
    body.value.identifier,
    body.value.email,
    body.value.password
  );

  // Update loading state
  loading.value = false;

  if (errors) {
    errors.forEach((error) => {
      notificationStore.add("error", {
        msg: error,
      });
    });
    return;
  }

  // Redirect to dashboard
  return router.push("/onboarding");
};
</script>

<template>
  <form id="form-signup" @submit.prevent="signup">
    <NuxtLink class="flex justify-center items-center" to="/">
      <Logo />
    </NuxtLink>
    <div class="border-2 border-zinc-800 rounded p-8 flex flex-col space-y-4">
      <h2 class="text-2xl">Opret konto</h2>
      <Input
        @input="(e) => (body.identifier = e.value)"
        type="text"
        placeholder="Indtast brugernavn"
        label="Brugernavn"
      />
      <Input
        @input="(e) => (body.email = e.value)"
        type="email"
        placeholder="Indtast e-mail"
        label="E-mail"
      />
      <Input
        @input="(e) => (body.password = e.value)"
        type="password"
        placeholder="Indtast password"
        label="Password"
      />
      <p class="text-sm text-zinc-400">
        Ved at oprette en konto acceptere du Tradify's
        <a class="text-indigo-500 hover:text-indigo-600" href="#"
          >vilkår og betingelser</a
        >
      </p>
      <Button :loading="loading">Opret konto</Button>
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
