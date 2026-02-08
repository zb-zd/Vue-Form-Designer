<template>
  <div class="designer-layout">
    <ComponentLibrary />
    <Canvas />
    <PropertyPanel />
  </div>
</template>

<script setup lang="ts">
import ComponentLibrary from './ComponentLibrary.vue'
import Canvas from './Canvas.vue'
import PropertyPanel from './PropertyPanel.vue'
</script>

<style scoped>
.designer-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
