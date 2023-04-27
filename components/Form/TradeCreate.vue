<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useNotificationStore from "~/stores/NotificationStore";
import useTradeStore from "~/stores/TradeStore";
import useUserStore from "~/stores/UserStore";

const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const tradeStore = useTradeStore();
const runtimeConfig = useRuntimeConfig();
const userStore = useUserStore();
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
    uuid: props.user ? props.user.uuid : null,
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
        Authorization: storeToRefs(authStore).accessToken.value,
      },
      body: JSON.stringify(trade.value),
    }
  ).then((res) => res.json());

  loading.value = false;

  if (errors) {
    errors.forEach((error) => {
      notificationStore.add("error", error);
    });
    return;
  }

  // Reset modal
  modal.value.currentModal = "";
  modal.value.show = false;

  // Push trade to tradeStore data
  trade.value = await tradeStore.load(data._id)
  storeToRefs(authStore).user.value.trades.push(trade.value);

  notificationStore.add("info", {
    msg: `Du har nu oprettet en ny handel: ${data._id}`,
  });
  return router.push(`/trade/${data._id}`);
};

onUnmounted(() => {
  storeToRefs(userStore).user.value = null;
});
</script>

<template>
  <form id="form-trade-create" @submit.prevent="create">
    <h2 class="text-2xl text-zinc-50">Opret handel</h2>
    <div class="flex flex-col space-y-2">
      <label for="user">Modtager</label>
      <div v-if="trade.to.uuid" class="flex items-center justify-between">
        <User :user="trade.to" />
        <Button type="tertiary" @click.prevent="trade.to.uuid = null">Slet</Button>
      </div>
      <FormUserSearch v-if="!trade.to.uuid" @done="(e) => {
          trade.to = e;
        }
        " />
    </div>

    <Input type="text" placeholder="Indtast titel" label="Titel" @input="(e) => (trade.title = e.value)" />

    <div class="flex flex-col space-y-2">
      <label for="description">Beskrivelse</label>
      <textarea v-model="trade.description"
        class="px-6 py-2 bg-zinc-800 rounded outline-indigo-500 text-zinc-50 h-32 text-sm resize-none"
        placeholder="Indtast beskrivelse"></textarea>
    </div>
    <p class="text-xs text-zinc-400">
      Ved oprette denne handel acceptere du at denne handel er blevet oprette og
      ikke kan annuleres igen jævnfør Tradify's
      <a class="text-indigo-500 hover:text-indigo-600" href="#">vilkår og betingelser</a>
    </p>
    <div class="flex items-center justify-between">
      <Button @click.prevent="modal.currentModal = '';
      modal.show = false;
                                " type="tertiary">Annuller</Button>
      <Button :loading=" loading ">Opret handel</Button>
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
