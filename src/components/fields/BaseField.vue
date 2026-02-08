<template>
  <div class="base-field">
    <el-form-item
      :label="props.label"
      :required="props.required"
    >
      <slot></slot>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false
})
</script>

<style scoped>
.base-field {
  width: 100%;
}
</style>
