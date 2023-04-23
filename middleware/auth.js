import useAuthStore from "~/stores/AuthStore";
import { storeToRefs } from "pinia";
import useDataStore from "~/stores/DataStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const refreshToken = useCookie("refreshToken");
  const authStore = useAuthStore();
  const dataStore = useDataStore();

  if (!(to.meta.layout == from.meta.layout)) {
    storeToRefs(dataStore).notifications.value = [];
  }

  if (!refreshToken.value) {
    return "/signin";
  }

  if (!storeToRefs(authStore).user.value) {
    const { errors } = await authStore.refresh();
    if (errors) {
      authStore.clear();
      return "/signin";
    }
  }

  if (!storeToRefs(authStore).user.value.profile.firstName) {
    return "/onboarding";
  }

  return true;
});
