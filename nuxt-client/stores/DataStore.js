import { defineStore } from "pinia";

const useDataStore = defineStore("data", () => {
    const trade = ref(null);
    const trades = ref([]);

    return { trade, trades }
})

export default useDataStore;