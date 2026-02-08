<template>
  <div class="designer-layout">
    <DesignerHeader />
    <div class="designer-content">
      <ComponentLibrary />
      <Canvas />
      <PropertyPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import DesignerHeader from './DesignerHeader.vue'
import ComponentLibrary from './ComponentLibrary.vue'
import Canvas from './Canvas.vue'
import PropertyPanel from './PropertyPanel.vue'
</script>

<style scoped>
.designer-layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.designer-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
