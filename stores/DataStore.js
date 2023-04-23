import { defineStore, storeToRefs } from "pinia";
import useAuthStore from "./AuthStore";

const useDataStore = defineStore("data", () => {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();

  // Trade related data
  const trade = ref(null);
  const trades = ref([]);

  // Trade related methods
  const loadTrade = async (id, forceUpdate = false) => {
    const saved = trades.value.filter((trade) => {
      return trade._id == id && trade.loaded + 10 >= new Date() / 1000;
    })[0];

    if (saved && !forceUpdate) {
      return saved;
    }

    const { data, errors } = await fetch(
      `${runtimeConfig.public.backendUrl}/trade/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: storeToRefs(authStore).accessToken.value,
        },
      }
    ).then((res) => res.json());

    if (errors) {
      return;
    }

    // Remove old expired trade if present
    trades.value = trades.value.filter((trade) => {
      return trade._id != id;
    });

    // Add new trade
    trades.value.push({
      ...data,
      loaded: new Date() / 1000,
    });

    return trades.value[trades.value.length - 1];
  };

  // Application related data
  const notifications = ref([]);

  const addNotification = (type = "info", data, timeout = 3000) => {
    notifications.value.push({
      type: type,
      data: data,
    });
    setTimeout(() => {
      //notifications.value.splice(notifications.value.length - 1, 1);
    }, timeout);
  };

  const clear = () => {
    trade.value = null;
    trades.value = [];
    notifications.value = [];
    return { trade, trades };
  };

  return { trade, trades, loadTrade, notifications, addNotification, clear };
});

export default useDataStore;
