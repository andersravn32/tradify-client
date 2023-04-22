import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");
  const runtimeConfig = useRuntimeConfig();

  const user = ref(null);

  const clear = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;

    return { accessToken, refreshToken, user };
  };

  const refresh = async () => {
    // Request refreshed data
    const { data, errors } = await fetch(
      `${runtimeConfig.public.backendUrl}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken.value }),
      }
    ).then((res) => res.json());

    // If errors occurred, reset store state
    if (errors) {
      clear();
      return { data, errors };
    }

    // Set store state
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    // Return response object
    return { data, errors };
  };

  const signout = async () => {
    const { data, errors } = await fetch(
      `${runtimeConfig.public.backendUrl}/auth/signout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken.value,
        }),
      }
    ).then((res) => res.json());

    // If errors are present, return errors
    if (errors) {
      return { data, errors };
    }

    // Reset store state
    clear();
    return { data, errors };
  };

  const signin = async (email, password) => {
    if (!email || !password) {
      return;
    }

    const { data, errors } = await fetch(
      `${runtimeConfig.public.backendUrl}/auth/provider/email/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    ).then((res) => res.json());

    // If errors are present, return errors before setting state
    if (errors) {
      clear();
      return { data, errors };
    }

    // Set response data
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    // Return data and errors
    return { data, errors };
  };

  const signup = async (identifier, email, password) => {
    if (!identifier || !email || !password) {
      return;
    }

    const { data, errors } = await fetch(
      `${runtimeConfig.public.backendUrl}/auth/provider/email/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, email, password }),
      }
    ).then((res) => res.json());

    // If errors are present, return errors before setting state
    if (errors) {
      clear();
      return { data, errors };
    }

    // Set response data
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    user.value = data.user;

    // Return data and errors
    return { data, errors };
  };

  return {
    accessToken,
    refreshToken,
    user,
    clear,
    refresh,
    signin,
    signup,
    signout,
  };
});

export default useAuthStore;
