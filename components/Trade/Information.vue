<script setup>
defineProps({
    trade: {
        type: Object,
        required: true,
    }
})
</script>

<template>
    <div class="trade-information">
        <div class="flex justify-between">
            <div class="flex flex-col space-y-2">
                <span class="uppercase text-zinc-400 text-sm">Titel</span>
                <h3 class="text-zinc-50">{{ trade.title }}</h3>
            </div>
            <div class="flex flex-col space-y-2">
                <span class="uppercase text-zinc-400 text-sm">Dato</span>
                <span class="text-zinc-50 text-sm">{{ trade.date.split("T")[0] }}</span>
            </div>
        </div>
        <div class="flex flex-col space-y-2">
            <span class="text-zinc-400 uppercase text-sm">Beskrivelse</span>
            <p class="text-zinc-50 text-sm">{{ trade.description }}</p>
        </div>
        <div class="flex flex-col space-y-2" v-if="trade.middleman.uuid">
            <span class="text-zinc-400 uppercase text-sm">Mellemmand</span>
            <UserSmall :user="trade.middleman" />
        </div>
    </div>
</template>

<style>
    .trade-information {
        @apply flex flex-col space-y-4;
    }
</style>