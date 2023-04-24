<script setup>
import { CheckBadgeIcon } from "@heroicons/vue/24/solid";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useTradeStore from "~/stores/TradeStore";

const router = useRouter();
const authStore = useAuthStore();
const tradeStore = useTradeStore();
const modal = useModal();

defineProps({
  trade: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="trade-header">
    <div class="trade-header-from">
      <span class="uppercase text-zinc-400 text-sm text-center pt-4"
        >Afsender</span
      >
      <div
        class="flex flex-col justify-center items-center cursor-pointer"
        @click="router.push(`/profile/${trade.from.identifier}`)"
        :class="{
          'opacity-50':
            trade.from.confirmed === 0 || trade.from.confirmed === -1,
        }"
      >
        <UserAvatar class="mb-4" size="xl" :url="trade.from.profile.avatar" />
        <span
          class="font-semibold text-2xl text-zinc-50 flex items-center space-x-2"
          ><span>{{ trade.from.profile.firstName }}</span>
          <CheckBadgeIcon
            v-if="trade.from.verified"
            class="h-6 w-6 text-sky-500"
        /></span>
        <span class="text-sm text-zinc-400">@{{ trade.from.identifier }}</span>
      </div>
      <div class="trade-header-details">
        <div class="flex flex-col space-y-2 p-4">
          <span class="text-xs uppercase text-zinc-400">Status:</span>
          <span v-if="trade.from.confirmed === 1" class="text-sm text-zinc-50"
            >Bekræftet</span
          >
          <span
            v-if="trade.from.confirmed === 0"
            class="text-sm text-zinc-400 italic"
            >Afventer</span
          >
          <span v-if="trade.from.confirmed === -1" class="text-sm text-red-500"
            >Afvist</span
          >
        </div>
        <div class="col-span-2 grid grid-cols-2 p-4">
          <div class="flex flex-col space-y-2 items-start">
            <span class="text-xs uppercase text-zinc-400">Bedømmelse:</span>
            <div v-if="trade.from.rating">
              <span
                v-if="trade.from.rating.value === 1"
                class="text-sm text-green-500"
                >Positiv</span
              >
              <span
                v-if="trade.from.rating.value === 0"
                class="text-sm text-zinc-50"
                >Neutral</span
              >
              <span
                v-if="trade.from.rating.value === -1"
                class="text-sm text-red-500"
                >Negativ</span
              >
            </div>
            <div
              class="flex"
              v-if="
                trade.from.uuid == storeToRefs(authStore).user.value.uuid &&
                !trade.from.rating
              "
            >
              <Button
                v-if="trade.from.confirmed === 1 && trade.to.confirmed === 1"
                @click="
                  storeToRefs(tradeStore).trade.value = trade;
                  modal.currentModal = 'modal-form-trade-rate';
                  modal.show = true;
                "
                size="sm"
                >Bedøm</Button
              >
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-xs uppercase text-zinc-400">Kommentar:</span>
            <span v-if="trade.from.rating" class="text-zinc-50 text-sm">{{
              trade.from.rating.message
            }}</span>
            <span v-if="!trade.from.rating" class="text-zinc-50 text-sm"
              >-</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="trade-header-to">
      <span class="uppercase text-zinc-400 text-sm text-center pt-4"
        >Modtager</span
      >
      <div
        class="flex flex-col justify-center items-center cursor-pointer"
        @click="router.push(`/profile/${trade.to.identifier}`)"
        :class="{
          'opacity-50': trade.to.confirmed == 0 || trade.to.confirmed == -1,
        }"
      >
        <UserAvatar class="mb-4" size="xl" :url="trade.to.profile.avatar" />
        <span
          class="font-semibold text-2xl text-zinc-50 flex items-center space-x-2"
          ><span>{{ trade.to.profile.firstName }}</span>
          <CheckBadgeIcon v-if="trade.to.verified" class="h-6 w-6 text-sky-500"
        /></span>
        <span class="text-sm text-zinc-400">@{{ trade.to.identifier }}</span>
      </div>
      <div class="trade-header-details">
        <div class="flex flex-col space-y-2 p-4 items-start">
          <span class="text-xs uppercase text-zinc-400">Status:</span>
          <span v-if="trade.to.confirmed === 1" class="text-sm text-zinc-50"
            >Bekræftet</span
          >
          <span class="flex items-center justify-between w-full">
            <span
              v-if="
                trade.to.uuid != storeToRefs(authStore).user.value.uuid &&
                trade.to.confirmed === 0
              "
              class="text-sm text-zinc-400 italic"
              >Afventer</span
            >
            <span v-if="trade.to.confirmed === -1" class="text-sm text-red-500"
              >Afvist</span
            >
            <Button
              size="sm"
              v-if="
                trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
                trade.to.confirmed === 0
              "
              @click="
                storeToRefs(tradeStore).trade.value = trade;
                modal.currentModal = 'modal-form-trade-respond';
                modal.show = true;
              "
              >Besvar</Button
            >
          </span>
        </div>
        <div class="col-span-2 grid grid-cols-2 p-4">
          <div class="flex flex-col space-y-2 items-start">
            <span class="text-xs uppercase text-zinc-400">Bedømmelse:</span>
            <div v-if="trade.to.rating">
              <span
                v-if="trade.to.rating.value === 1"
                class="text-sm text-green-500"
                >Positiv</span
              >
              <span
                v-if="trade.to.rating.value === 0"
                class="text-sm text-zinc-50"
                >Neutral</span
              >
              <span
                v-if="trade.to.rating.value === -1"
                class="text-sm text-red-500"
                >Negativ</span
              >
            </div>
            <Button
              v-if="
                trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
                trade.from.confirmed === 1 &&
                trade.to.confirmed === 1 &&
                !trade.to.rating
              "
              @click="
                storeToRefs(tradeStore).trade.value = trade;
                modal.currentModal = 'modal-form-trade-rate';
                modal.show = true;
              "
              size="sm"
              >Bedøm</Button
            >
          </div>
          <div class="flex flex-col space-y-2">
            <span class="text-xs uppercase text-zinc-400">Kommentar:</span>
            <span v-if="trade.to.rating" class="text-zinc-50 text-sm">{{
              trade.to.rating.message
            }}</span>
            <span v-if="!trade.to.rating" class="text-zinc-50 text-sm">-</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.trade-header {
  @apply grid grid-cols-2 divide-x-2 divide-zinc-800;
}

.trade-header-from,
.trade-header-to {
  @apply flex flex-col space-y-4;
}

.trade-header-details {
  @apply grid grid-cols-3 border-y-2 border-zinc-800 divide-x-2 divide-zinc-800 h-full;
}
</style>
