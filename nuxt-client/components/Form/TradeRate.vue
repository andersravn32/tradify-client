<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const props = defineProps({
  trade: {
    type: Object,
    required: true,
  },
});

const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();

const rating = ref({
  value: "",
  message: null,
});

const rate = async () => {
  if (rating.value.value == "") {
    return;
  }

  if (rating.value.message.length <= 5 || rating.value.message.length >= 250) {
    return;
  }

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

  console.log(data, errors);
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
      <Button @click.prevent type="tertiary">Annuller</Button>
      <Button>Bedøm</Button>
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
