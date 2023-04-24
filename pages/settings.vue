<script setup>
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