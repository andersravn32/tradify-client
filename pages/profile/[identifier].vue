<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";
import useNotificationStore from "~/stores/NotificationStore";
import useUserStore from "~/stores/UserStore";

definePageMeta({
  layout: "app",
  name: "Profil",
  middleware: "auth",
});

const router = useRouter();
const userStore = useUserStore();
const { data } = await userStore.search(router.currentRoute.value.params.identifier);

</script>

<template>
  <section id="page-profile">
    <UserProfile :user="data[0]" />
  </section>
</template>
