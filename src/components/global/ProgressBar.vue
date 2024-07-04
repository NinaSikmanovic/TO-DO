<template>
  <v-progress-circular
      :size="size"
      :color="color"
      indeterminate
      class="progress-bar"
  >
  </v-progress-circular>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    size: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

<style scoped>
.progress-bar {
  display: block;
  margin: auto;
}
</style>
