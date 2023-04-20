<script setup>
import {
  ArrowLeftOnRectangleIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);

// Use auth store
const authStore = useAuthStore();
const authStoreRefs = storeToRefs(authStore);
const router = useRouter();

const user = ref({
  ...props.user,
});

if (!user.value.trades) {
  const { data, errors } = await fetch(
    `https://prod.tradify.dk/user/${user.value.uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authStoreRefs.accessToken.value,
      },
    }
  ).then((res) => res.json());
    console.log(data,errors)
  user.value = data;
}
</script>

<template>
  <Overlay @click="$emit('close')" />
  <div class="user-card">
    <UserAvatar class="mx-auto" size="xl" :url="user.profile.avatar" />
    <div class="flex flex-col items-center">
      <span class="font-semibold text-lg text-zinc-50">{{
        user.profile.firstName
      }}</span>
      <span class="text-sm text-zinc-400 mb-2">@{{ user.identifier }}</span>
      <UserRole :role="user.role" />
    </div>
    <TradeCounter
      v-if="user.trades"
      :trades="user.trades"
      :userId="user.uuid"
    />

    <ul
      class="flex flex-col space-y-4"
      v-if="authStoreRefs.user.value.uuid == user.uuid"
    >
      <li>
        <NuxtLink class="router-link" to="/"
          ><UserIcon class="h-6 w-6" /><span>Rediger profil</span></NuxtLink
        >
      </li>
      <li>
        <NuxtLink class="router-link" to="/"
          ><QuestionMarkCircleIcon class="h-6 w-6" /><span
            >F.A.Q</span
          ></NuxtLink
        >
      </li>
      <li>
        <Button
          type="tertiary"
          class="flex items-center space-x-2 signout"
          @click="
            () => {
              authStore.signout();
              router.push('/signin');
            }
          "
          ><ArrowLeftOnRectangleIcon class="h-6 w-6" /><span
            >Log ud</span
          ></Button
        >
      </li>
    </ul>
    <ul
      class="flex flex-col space-y-4"
      v-if="authStoreRefs.user.value.uuid != user.uuid"
    >
    <li>
        <NuxtLink class="router-link" to="/"
          ><UserIcon class="h-6 w-6" /><span
            >Besøg profil</span
          ></NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<style>
.user-card {
  @apply bg-zinc-800 shadow-lg w-64 absolute right-0 top-full flex flex-col p-4 rounded space-y-4 z-20 cursor-default;
}

.user-card .router-link {
  @apply flex items-center space-x-2 rounded font-semibold text-sm text-zinc-400 hover:text-zinc-100;
}

.user-card .signout {
  @apply text-red-500 hover:text-red-600;
}
</style>
