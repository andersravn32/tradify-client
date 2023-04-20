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
#content {
  @apply pl-64 pt-[74px];
}
</style>
