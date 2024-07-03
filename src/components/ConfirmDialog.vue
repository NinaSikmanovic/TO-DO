<template>
  <v-dialog v-model="dialogVisible" max-width="290" persistent>
    <v-card>
      <v-card-title class="dialog-title">{{ message }}</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn class="btn confirm-btn" @click="confirm">Yes</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    message: String,
  },
  data() {
    return {
      dialogVisible: this.isOpen,
    };
  },
  methods: {
    confirm() {
      this.$emit('confirm');
      this.cancel();
    },
    cancel() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

.dialog-title {
  font-size: 16px !important;
}

</style>