import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");
  const user = ref(null);
  
  const refresh = async () => {
    // Request refreshed data
    const { data, errors } = await fetch(
      "https://prod.tradify.dk/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken.value }),
      }
    ).then((res) => res.json());

    // Set store state
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    // Return response object
    return { data, errors };
  };

  return { accessToken, refreshToken, user, refresh };
});

export default useAuthStore;
