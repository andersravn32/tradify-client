import { defineStore, storeToRefs } from "pinia";
import useAuthStore from "./AuthStore";

const useTradeStore = defineStore("trade", () => {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();

  const trade = ref(null);
  const trades = ref([]);

  // Method responsible for loading invididual trades
  const load = async (id, forceUpdate = false) => {
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
      errors.forEach((error) => {
        addNotification("error", error);
      });
      return;
    }

    // Remove old expired trade if present
    trades.value = trades.value.filter((trade) => {
      return trade._id != id;
    });

    // Add new trade
    trades.value.push({
      ...data,
      loaded: new Date(data.date) / 1000,
    });

    return trades.value[trades.value.length - 1];
  };

  const clear = () => {
    trade.value = null;
    trades.value = [];
  };

  return { trade, trades, load, clear };
});

export default useTradeStore;
