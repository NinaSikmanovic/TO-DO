<template>
  <v-progress-circular
      :size="size"
      :color="color"
      :indeterminate="indeterminate"
      class="progress-bar"
      :aria-label="name">
  </v-progress-circular>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    size: {
      type: Number,
      default: 50,
    },
    color: {
      type: String,
      default: 'primary',
    },
    indeterminate: {
      type: Boolean,
      default: true,
    },
  },
};

</script>