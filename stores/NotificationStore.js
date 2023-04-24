import { defineStore } from "pinia";

const useNotificationStore = defineStore("notification", () => {
  // Notification related data
  const notifications = ref([]);

  const add = (type = "info", data, timeout = 3000) => {
    notifications.value.push({
      type: type,
      data: data,
    });
    setTimeout(() => {
      //notifications.value.splice(notifications.value.length - 1, 1);
    }, timeout);
  };

  const clear = () => {
    notifications.value = [];
  };

  return { notifications, add, clear };
});

export default useNotificationStore;
