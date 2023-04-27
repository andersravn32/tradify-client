import useAuthStore from "~/stores/AuthStore";
import { storeToRefs } from "pinia";
import useNotificationStore from "~/stores/NotificationStore";


export default defineNuxtRouteMiddleware(async (to, from) => {
  const refreshToken = useCookie("refreshToken");
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();

  if (!(to.meta.layout == from.meta.layout)) {
    storeToRefs(notificationStore).notifications.value = [];
  }

  if (!refreshToken.value) {
    return "/signin"
  }

  if (!storeToRefs(authStore).user.value) {
    const { errors } = await authStore.refresh();
    if (errors) {
      authStore.clear();
      return "/";
    }
  }

  if (!storeToRefs(authStore).user.value.profile.firstName) {
    return "/onboarding";
  }

  return true;
});
