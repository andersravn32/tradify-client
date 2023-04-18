import useAuthStore from "~/stores/AuthStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  const authStoreRefs = storeToRefs(authStore);

  if (!authStoreRefs.user.value) {
    return "/signin";
  }

  return true;
});
