<script setup>
import {
  EllipsisHorizontalIcon,
  ArrowRightIcon,
  ArrowUturnLeftIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/vue/24/outline";
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
const router = useRouter();
const modal = useModal();
const dataStore = useDataStore();

const trade = await dataStore.loadTrade(props.trade._id)
</script>

<template>
  <li class="trade-list-item">
    <span
      class="font-semibold flex flex-col cursor-pointer text-sm text-zinc-50"
      @click="router.push(`/trade/${trade._id}`)"
      >{{ trade.title }}</span
    >
    <span class="font-bold text-zinc-50 text-sm">{{
      trade.category ? trade.category : "-"
    }}</span>
    <UserSmall :user="trade.from" />
    <UserSmall :user="trade.to" />
    <div class="flex items-center space-x-4">
      <DropdownButton>
        <template #icon>
          <EllipsisHorizontalIcon class="h-6 w-6" />
        </template>
        <template #content>
          <ul class="flex flex-col space-y-2 w-32">
            <li>
              <NuxtLink class="router-link" :to="`/trade/${trade._id}`"
                ><ArrowRightIcon class="h-4 w-4" /><span
                  >Gå til handel</span
                ></NuxtLink
              >
            </li>
            <li
              v-if="
                trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
                !trade.to.confirmed
              "
            >
              <span
                class="router-link"
                @click="
                  storeToRefs(dataStore).trade.value = trade;
                  modal.currentModal = 'modal-form-trade-respond';
                  modal.show = true;
                "
              >
                <ArrowUturnLeftIcon class="h-4 w-4" />
                <span>Besvar handel</span>
              </span>
            </li>
            <li
              v-if="
                (trade.from.uuid == storeToRefs(authStore).user.value.uuid &&
                  trade.from.confirmed &&
                  trade.to.confirmed &&
                  !trade.from.rating) ||
                (trade.to.uuid == storeToRefs(authStore).user.value.uuid &&
                  trade.to.confirmed &&
                  trade.from.confirmed &&
                  !trade.to.rating)
              "
            >
              <span
                class="router-link"
                @click="
                  storeToRefs(dataStore).trade.value = trade;
                  modal.currentModal = 'modal-form-trade-rate';
                  modal.show = true;
                "
              >
                <ChatBubbleBottomCenterIcon class="h-4 w-4" />
                <span>Bedøm handel</span>
              </span>
            </li>
          </ul>
        </template>
      </DropdownButton>
    </div>
  </li>
</template>

<style>
.trade-list-item {
  @apply grid grid-cols-5 gap-4 items-center;
}

.trade-list-item .router-link {
  @apply font-semibold flex items-center space-x-2 text-zinc-400 hover:text-zinc-50 text-xs cursor-pointer;
}
</style>
