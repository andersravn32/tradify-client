import useAuthStore from "~/stores/AuthStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async () => {
  const refreshToken = useCookie("refreshToken");
  const authStore = useAuthStore();

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
