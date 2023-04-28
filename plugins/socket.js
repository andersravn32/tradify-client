import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const socket = io(runtimeConfig.public.backendUrl);
  const state = ref({
    ready: false
  })

  return {
    provide: {
      socket: socket,
      state: state
    },
  };
});
