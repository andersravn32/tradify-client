<template>
  <div id="layout-app">
    <div id="modals"></div>
    <div id="navigation">
      <Sidenav />
      <Topnav />
    </div>
    <div id="content">
      <slot />
    </div>
  </div>
</template>

<style>
#layout-app #content {
  @apply pl-80 pt-[74px];
}
</style>
