<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useDataStore from "~/stores/DataStore";

const router = useRouter();
const authStore = useAuthStore();
const dataStore = useDataStore();
const runtimeConfig = useRuntimeConfig();

const onboardingIndex = ref(0);
const loading = ref(false);

const { data, errors } = await fetch(
  `${runtimeConfig.public.backendUrl}/auth/refresh`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: storeToRefs(authStore).refreshToken.value }),
  }
).then((res) => res.json());

const user = ref({
  ...data.user,
});

const save = async () => {
  // Update loading state
  loading.value = true;

  const { data, errors } = await fetch(
    `${runtimeConfig.public.backendUrl}/user/${user.value.uuid}/profile`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: storeToRefs(authStore).accessToken.value,
      },
      body: JSON.stringify({
        ...user.value.profile,
      }),
    }
  ).then((res) => res.json());
    
  // Update loading state
  loading.value = false;
  if (errors) {
    errors.forEach((error) => {
      dataStore.addNotification("error", error);
    });
    return;
  }
  
  storeToRefs(authStore).user.value.profile = data;

  return router.push("/dashboard");
};
</script>

<template>
  <form id="form-onboarding" @submit.prevent>
    <NuxtLink class="flex justify-center items-center" to="/">
      <Logo />
    </NuxtLink>
    <div
      v-if="onboardingIndex == 0"
      class="border-2 border-zinc-800 rounded p-8 flex flex-col space-y-4"
    >
      <h2 class="text-2xl">Velkommen til!</h2>
      <p class="text-zinc-400 text-sm">
        Før at du for alvor kan komme igang med at handle, skal vi bruge lidt
        ekstra informationer omkring dig.
      </p>
      <div class="flex items-center justify-between">
        <Button @click="router.push('/')" type="tertiary">Annuller</Button>
        <Button @click="onboardingIndex++">Kom igang</Button>
      </div>
    </div>
    <div
      v-if="onboardingIndex == 1"
      class="border-2 border-zinc-800 rounded p-8 flex flex-col space-y-4"
    >
      <h2 class="text-2xl">Basale informationer</h2>
      <p class="text-zinc-400 text-sm">
        Indtast venligst fornavn og efternavn forneden, så andre brugere i
        fællesskabet lettere identificere dig.
      </p>
      <Input
        @input="(e) => (user.profile.firstName = e.value)"
        type="text"
        placeholder="Indtast fornavn"
        label="Fornavn"
      />
      <Input
        @input="(e) => (user.profile.lastName = e.value)"
        type="text"
        placeholder="Indtast efternavn"
        label="Efternavn"
      />
      <div class="flex items-center justify-between">
        <Button @click="onboardingIndex--" type="tertiary">Tilbage</Button>
        <Button @click="save()" :loading="loading">Gem</Button>
      </div>
    </div>
  </form>
</template>

<style>
#form-onboarding {
  @apply w-full max-w-md flex flex-col space-y-4;
}
</style>
