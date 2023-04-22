<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
const runtimeConfig = useRuntimeConfig();
const modal = useModal();
const router = useRouter();

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
});

const trade = ref({
  to: {
    uuid: props.user,
  },
  middleman: {
    uuid: null,
  },
  title: null,
  description: null,
});

const loading = ref(false);

const create = async () => {
  // Update loading state
  loading.value = true;

  const { data, errors } = await fetch(
    `${runtimeConfig.public.backendUrl}/trades`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authStoreRefs.accessToken.value,
      },
      body: JSON.stringify(trade.value),
    }
  ).then((res) => res.json());

  loading.value = false;

  if (!data || errors) {
    return;
  }

  modal.value.currentModal = "";
  modal.value.show = false;
  return router.push(`/trade/${data._id}`);
};
</script>

<template>
  <form id="form-trade-create" @submit.prevent="create">
    <h2 class="text-2xl text-zinc-50">Opret handel</h2>
    <div class="flex flex-col space-y-2">
      <label for="user">Modtager</label>
      <FormUserSearch @done="(e) => (trade.to.uuid = e.uuid)" />
    </div>

    <Input
      type="text"
      placeholder="Indtast titel"
      label="Titel"
      @input="(e) => (trade.title = e.value)"
    />

    <div class="flex flex-col space-y-2">
      <label for="description">Beskrivelse</label>
      <textarea
        v-model="trade.description"
        class="px-6 py-2 bg-zinc-800 rounded outline-indigo-500 text-zinc-50 h-32 text-sm resize-none"
        placeholder="Indtast beskrivelse"
      ></textarea>
    </div>
    <p class="text-xs text-zinc-400">
      Ved oprette denne handel acceptere du at denne handel er blevet oprette og
      ikke kan annuleres igen jævnfør Tradify's
      <a class="text-indigo-500 hover:text-indigo-600" href="#"
        >vilkår og betingelser</a
      >
    </p>
    <div class="flex items-center justify-between">
      <Button
        @click.prevent="
          modal.currentModal = '';
          modal.show = false;
        "
        type="tertiary"
        >Annuller</Button
      >
      <Button :loading="loading">Opret handel</Button>
    </div>
  </form>
</template>

<style>
#form-trade-create {
  @apply w-full max-w-md flex flex-col space-y-4 p-4;
}

#form-trade-create label {
  @apply text-zinc-400 uppercase text-sm;
}
</style>
