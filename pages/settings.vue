<script setup>
import { storeToRefs } from "pinia";
import useAuthStore from "../stores/AuthStore";

definePageMeta({
    layout: "app",
    name: "Indstillinger",
    middleware: "auth",
});

const authStore = useAuthStore();

</script>

<template>
    <section id="page-settings">
        <Tabs>
            <Tab title="Profil">
                <div></div>
            </Tab>
            <Tab title="Notifikationer">
                <div></div>
            </Tab>
            <Tab title="API">
                <div></div>
            </Tab>
        </Tabs>
    </section>
</template>

<style>
.tabs-titles {
    @apply flex items-center space-x-4 p-4 border-b-2 border-zinc-800;
}

.tab-title {
    @apply text-sm uppercase text-zinc-400 cursor-pointer hover:text-zinc-50;
}

.tab-title-active {
    @apply text-zinc-50;
}

.tab {
    @apply flex flex-col p-4;
}
</style>