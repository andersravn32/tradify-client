<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "~/stores/AuthStore";

const authStore = useAuthStore();
const runtimeConfig = useRuntimeConfig();

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const results = ref([]);
const selected = ref(null);

defineEmits(["done", "reset"]);

const handleInput = debounce((e) => {
  search(e);
})

const search = async (e) => {
  if (!e.value) {
    return;
  }

  const { data, errors } = await fetch(
    `${runtimeConfig.public.backendUrl}/users/${e.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: storeToRefs(authStore).accessToken.value,
      },
    }
  ).then((res) => res.json());

  if (!data || !data.length) {
    return;
  }

  results.value = data.filter((user) => {
    return user.uuid != storeToRefs(authStore).user.value.uuid;
  });
};
</script>

<template>
  <div id="form-search">
    <div v-if="!selected" class="flex flex-col space-y-4">
      <Input
        type="text"
        placeholder="Indtast brugernavn eller e-mail"
        @input="handleInput"
      />
      <ul v-if="results.length" class="flex flex-col space-y-2">
        <li v-for="user in results" class="flex items-center justify-between">
          <UserSmall :user="user" />
          <Button
            type="primary"
            size="sm"
            @click="
              results = [];
              selected = user;
              $emit('done', user);
            "
            >Vælg</Button
          >
        </li>
      </ul>
    </div>
    <div v-if="selected" class="flex items-center justify-between">
      <UserSmall :user="selected" />
      <Button
        type="secondary"
        size="sm"
        @click="
          selected = null;
          $emit('reset');
        "
      >
        Slet
      </Button>
    </div>
  </div>
</template>
