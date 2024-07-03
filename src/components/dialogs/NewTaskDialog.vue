<template>
  <v-dialog v-model="dialogVisible"
            max-width="500"
            @click:outside="closeDialog">
    <v-card>
      <v-card-title>Add new task</v-card-title>
      <validation-observer v-slot="{ invalid, handleSubmit }" ref="form">
        <v-form @submit.prevent="handleSubmit(saveTask)">
          <v-card-text>
            <validation-provider
                name="Task title"
                rules="required|max:150"
                v-slot="{ errors, handleChange }">
              <v-text-field
                  v-model="newTaskTitle"
                  label="Task title"
                  :error-messages="errors"
                  @input="handleChange"
              ></v-text-field>
            </validation-provider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="$emit('close')">Cancel</v-btn>
            <v-btn
                class="btn confirm-btn"
                :disabled="invalid"
                @click="handleSubmit(saveTask)"
                :loading="loading">
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    loading: Boolean,
  },
  data() {
    return {
      newTaskTitle: '',
      dialogVisible: this.isOpen,
    };
  },
  methods: {
    saveTask() {
      this.$emit('save-task', this.newTaskTitle);
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$emit('close');
    },
  },
};
</script>
