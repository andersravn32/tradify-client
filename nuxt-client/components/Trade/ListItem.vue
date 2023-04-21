<script setup>
import {
  EllipsisHorizontalIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";
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

const { data, errors } = await fetch(
  `${runtimeConfig.public.backendUrl}/trade/${props.trade._id}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: storeToRefs(authStore).accessToken.value,
    },
  }
).then((res) => res.json());

const trade = ref({
  ...props.trade,
  ...data,
});
</script>

<template>
  <li class="trade-list-item">
    <span class="font-bold text-zinc-50 text-sm">{{ trade.title }}</span>
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
          <ul class="flex flex-col w-32">
            <li>
              <NuxtLink class="router-link" :to="`/trade/${trade._id}`"
                ><ArrowRightIcon class="h-4 w-4" /><span
                  >Gå til handel</span
                ></NuxtLink
              >
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

.trade-list-item .accept {
  @apply border-green-500 text-green-500 hover:border-green-600 hover:text-green-600;
}

.trade-list-item .reject {
  @apply border-red-500 text-red-500 hover:border-red-600 hover:text-red-600;
}

.trade-list-item .router-link {
    @apply font-semibold flex items-center space-x-2 text-zinc-400 hover:text-zinc-50 text-xs;
}
</style>
