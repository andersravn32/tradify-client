<script setup>
const slots = useSlots();
const tabs = slots.default();

const selectedTitle = ref(tabs[0].props.title);

provide("selectedTitle", selectedTitle)
</script>

<template>
    <div class="tabs">
        <ul class="tabs-titles">
            <li v-for="tab in tabs" @click="selectedTitle = tab.props.title" class="tab-title"
                :class="{ 'tab-title-active': selectedTitle == tab.props.title }">
                {{ tab.props.title }}
            </li>
        </ul>
        <slot />
    </div>
</template>