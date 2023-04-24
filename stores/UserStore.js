import { defineStore, storeToRefs } from "pinia";
import useAuthStore from "./AuthStore";
import useNotificationStore from "./NotificationStore";

const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();
  const runtimeConfig = useRuntimeConfig();

  const user = ref(null);
  const users = ref([]);

  // Returns shallow user object
  const search = async (query) => {
    const { data, errors } = await fetch(
      `${runtimeConfig.public.backendUrl}/users/${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: storeToRefs(authStore).accessToken.value,
        },
      }
    ).then((res) => res.json());

    if (errors) {
      errors.forEach((error) => {
        notificationStore.add("error", error);
      });
      return;
    }

    data.forEach((user) => {
      users.value = users.value.filter((cachedUser) => {
        return !(cachedUser.uuid == user.uuid);
      });

      users.value.push({
        ...user,
        loaded: new Date() / 1000,
      });
    });

    return { data, errors };
  };

  // Returns deep user object
  const find = async (id, forceUpdate = false) => {
    const saved = users.value.filter((user) => {
      return user.uuid == id && user.loaded + runtimeConfig.public.caching >= new Date() / 1000;
    })[0];

    if (saved && saved.trades && !forceUpdate) {
      return saved;
    }

    const { data, errors } = await fetch(
      `${runtimeConfig.public.backendUrl}/user/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: storeToRefs(authStore).accessToken.value,
        },
      }
    ).then((res) => res.json());

    if (errors) {
      errors.forEach((error) => {
        notificationStore.add("error", error);
      });
      return;
    }

    // Remove old expired trade if present
    users.value = users.value.filter((user) => {
      return user.uuid != id;
    });

    users.value.push({
      ...data,
      loaded: new Date() / 1000,
    });

    return data;
  };

  return { user, users, search, find };
});

export default useUserStore;
