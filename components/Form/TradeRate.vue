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

const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();
const modal = useModal();
const dataStore = useDataStore();
const router = useRouter();

const loading = ref(false);

const rating = ref({
  value: "",
  message: "",
});

const rate = async () => {
  if (loading.value){
    return;
  }

  if (rating.value.value == "") {
    return;
  }

  if (rating.value.message.length <= 5 || rating.value.message.length >= 250) {
    return;
  }

  // Update loading state
  loading.value = true;

  const { data, errors } = await fetch(
    `${runtimeConfig.public.backendUrl}/trade/${props.trade._id}/rate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: storeToRefs(authStore).accessToken.value,
      },
      body: JSON.stringify({
        rating: {
          message: rating.value.message,
          value: Number(rating.value.value),
        },
      }),
    }
  ).then((res) => res.json());

  // Update loading state
  loading.value = false;

  if (!data) {
    return;
  }

  modal.value.currentModal = "";
  modal.value.show = false;
  storeToRefs(dataStore).trade.value = await dataStore.loadTrade(props.trade._id, true);

  if (!(router.currentRoute.value.fullPath == `/trade/${props.trade._id}`)) {
    router.push(`/trade/${props.trade._id}`);
  }
};
</script>

<template>
  <form id="form-trade-rate" @submit.prevent="rate">
    <h2 class="text-2xl text-zinc-50">Bedøm handel</h2>
    <div class="flex flex-col space-y-2 w-full">
      <label>Bedømmelse</label>
      <select
        class="bg-zinc-800 rounded outline-indigo-500 text-zinc-50 px-6 py-2 text-sm"
        v-model="rating.value"
      >
        <option value="" disabled selected>Vælg venligst</option>
        <option value="1">Positiv</option>
        <option value="0">Neutral</option>
        <option value="-1">Negativ</option>
      </select>
    </div>
    <div class="flex flex-col space-y-2 w-full">
      <label>Kommentar</label>
      <textarea
        v-model="rating.message"
        class="px-6 py-2 bg-zinc-800 rounded outline-indigo-500 text-zinc-50 h-32 text-sm resize-none"
        placeholder="Skriv venligst en kommentar"
      ></textarea>
    </div>
    <p class="text-xs text-zinc-400 py-2">
      Bemærk: Denne bedømmelse er <strong>endelig</strong>. Det vil sige at den
      ikke kan redigeres og/eller slettes såfremt den er afgivet.
    </p>
    <div class="w-full flex items-center justify-between">
      <Button
        @click.prevent="
          modal.currentModal = '';
          modal.show = false;
        "
        type="tertiary"
        >Annuller</Button
      >
      <Button :loading="loading">Bedøm</Button>
    </div>
  </form>
</template>

<style>
#form-trade-rate {
  @apply w-full max-w-md flex flex-col items-start space-y-4 p-4;
}

#form-trade-rate label {
  @apply text-zinc-400 uppercase text-sm;
}
</style>
