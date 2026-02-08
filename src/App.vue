<template>
  <DesignerLayout />
</template>

<script setup lang="ts">
import DesignerLayout from './components/designer/DesignerLayout.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
