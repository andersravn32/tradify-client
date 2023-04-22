<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useDataStore from "~/stores/DataStore";

const props = defineProps({
  trade: {
    type: Object,
    required: true,
  },
});

const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();
const modal = useModal();
const dataStore = useDataStore();
const router = useRouter();

const accept = async () => {
  const { message } = await fetch(
    `${runtimeConfig.public.backendUrl}/trade/${props.trade._id}/accept`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: storeToRefs(authStore).accessToken.value,
      },
    }
  ).then((res) => res.json());

  if (!message){
    return;
  }

  modal.value.currentModal = '';
  modal.value.show = false;
  storeToRefs(dataStore).trade.value = null;

  if (!(router.currentRoute.value.fullPath == `/trade/${props.trade._id}`)){
    router.push(`/trade/${props.trade._id}`)
  }
};

const reject = async () => {
  const { message } = await fetch(
    `${runtimeConfig.public.backendUrl}/trade/${props.trade._id}/reject`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: storeToRefs(authStore).accessToken.value,
      },
    }
  ).then((res) => res.json());

  if (!message){
    return;
  }

  modal.value.currentModal = '';
  modal.value.show = false;
  storeToRefs(dataStore).trade.value = null;

  if (!(router.currentRoute.value.fullPath == `/trade/${props.trade._id}`)){
    router.push(`/trade/${props.trade._id}`)
  }
};
</script>

<template>
  <form id="form-trade-respond">
    <h2 class="text-2xl text-zinc-50">Besvar handel</h2>
    <div class="flex flex-col space-y-2">
      <label>Titel</label>
      <h3 class="text-zinc-50 text-sm">{{ trade.title }}</h3>
    </div>
    <div class="flex flex-col space-y-2">
      <label>Beskrivelse</label>
      <p class="text-zinc-50 text-sm">{{ trade.description }}</p>
    </div>
    <div class="flex flex-col space-y-2">
      <label>Afsender</label>
      <UserSmall class="bg-zinc-900 p-2 rounded" :user="trade.from" />
    </div>
    <div v-if="trade.middleman.uuid" class="flex flex-col space-y-2">
      <label>Mellemmand</label>
      <UserSmall :user="trade.middleman" />
    </div>
    <p class="text-xs text-zinc-400 py-2">
      Bemærk: Ved accept af denne handel acceptere du at modparten til hver en
      tid kan afgive en bedømmelse af handel, og at denne muligvis kan have
      negative konsekvenser for dit omdømme på Tradify.
    </p>
    <div class="flex items-center w-full justify-between">
      <Button @click.prevent="reject" type="tertiary">Afvis</Button>
      <Button @click.prevent="accept">Accepter</Button>
    </div>
  </form>
</template>

<style>
#form-trade-respond {
  @apply w-full max-w-sm flex flex-col items-start space-y-4 p-4;
}

#form-trade-respond label {
  @apply text-zinc-400 uppercase text-sm;
}
</style>
