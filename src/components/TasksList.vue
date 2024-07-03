<template>
  <v-container>
    <div class="tasks-list">
      <div class="top-section">
        <div class="todo-title"> TO DO:</div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span @click="openAddTaskDialog" class="btn plus-btn" v-bind="attrs" v-on="on">
              <i class="ph ph-plus-circle"></i>
            </span>
          </template>
          <span class="custom-tooltip">Add task</span>
        </v-tooltip>
      </div>

      <v-progress-circular
          v-if="loading"
          :size="50"
          color="primary"
          indeterminate
          class="progress-bar"
      ></v-progress-circular>

      <div v-if="tasks && tasks.length > 0">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <div>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span @click="completeTask(task.id)" class="btn complete-btn" v-bind="attrs" v-on="on">
                <i class="ph ph-check"></i>
              </span>
            </template>
            <span class="custom-tooltip">Complete task</span>
          </v-tooltip>

          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span @click="openDeleteDialog(task.id)" class="btn delete-btn" v-bind="attrs" v-on="on">
                <i class="ph ph-trash"></i>
              </span>
            </template>
            <span class="custom-tooltip">Delete task</span>
          </v-tooltip>
        </div>
      </div>
      </div>
      <div v-else>
        Your to-do list is empty. Add a new task to start organizing your to-dos.
      </div>
    </div>

    <v-dialog v-model="dialog.visible" max-width="290" persistent>
      <v-card>
        <v-card-title class="dialog-title">Are you sure you want to delete this task?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog.visible = false">Cancel</v-btn>
          <v-btn class="btn confirm-btn" @click="confirmDelete">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="addTaskDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Add New Task</v-card-title>
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
              <v-btn @click="addTaskDialog = false">Cancel</v-btn>
              <v-btn
                  class="btn confirm-btn"
                  :disabled="invalid"
                  @click="handleSubmit(saveTask)"
                  :loading="loading"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-form>
        </validation-observer>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>

import {TasksService} from "@/services/TasksService";

export default {
  name: 'TasksList',
  created() {
    this.getTasks();
  },
  data() {
    return {
      deleteOrganisationModal: false,
      tasks: [],
      loading: true,
      error: null,
      dialog: {
        visible: false,
        taskId: null,
      },
      addTaskDialog: false,
      newTaskTitle: '',
      snackbar: {
        visible: false,
        message: '',
      },
    };
  },
  methods: {
    async getTasks() {
      try {
        this.loading = true;
        const response = await TasksService.getTasks();
        this.tasks = response.data.sort((a, b) => a.completed - b.completed);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    completeTask(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
      this.tasks = this.tasks.sort((a, b) => a.completed - b.completed);

    },

    async deleteTask(id) {
      try {
        await TasksService.deleteTask(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }

    },

    openDeleteDialog(taskId) {
      this.dialog.visible = true;
      this.dialog.taskId = taskId;
    },

    confirmDelete() {
      this.deleteTask(this.dialog.taskId);
      this.dialog.visible = false;
    },

    openAddTaskDialog() {
      this.newTaskTitle = "";
      this.$refs.form?.reset();
      this.addTaskDialog = true;
    },

    async saveTask() {

      const body = {
        title: this.newTaskTitle
      }

      try {
        await TasksService.saveTask(body);

        if (this.newTaskTitle.trim() === '') return;

        const newTask = {
          id: this.tasks.length + 1,
          title: this.newTaskTitle,
          completed: false,
        };

        this.tasks.push(newTask);
        this.addTaskDialog = false;
        this.newTaskTitle = '';
        this.tasks = this.tasks.sort((a, b) => a.completed - b.completed);
        this.showSnackbar('Task successfully saved');

      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }

    },

    showSnackbar(message) {
      this.snackbar.message = message;
      this.snackbar.visible = true;
    },
  },
}
</script>

<style scoped>

.tasks-list {
  max-width: 80%;
  margin: 0 auto;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.2rem;
  margin-bottom: 0.5rem;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, transform 0.3s ease;
  word-break: break-all;
}

.task-item:hover {
  background: #e0e0e0;
  transform: scale(1.02);
}

.task-item span {
  flex: 1;
  font-size: 1rem;
  color: #333;
}

.task-item span.completed {
  text-decoration: line-through;
  color: #888;
}

.btn {
  cursor: pointer;
  margin-left: 0.5rem;
  transition: color 0.3s ease;

  i {
    font-size: 24px;
  }
}

.complete-btn {
  color: #4caf50;
}

.complete-btn:hover {
  color: #388e3c;
}

.delete-btn {
  color: #f44336;
}

.delete-btn:hover {
  color: #c62828;
}

.confirm-btn {
  margin-left: 8px;
}

.plus-btn {
  float: right;
}

.dialog-title {
  font-size: 16px !important;
}

.todo-title {
  font-size: 16px;
  font-weight: 800;
  padding-bottom: 10px;
  padding-left: 4px;
}

.top-section {
  display: flex;
  justify-content: space-between;
  padding: 10px 8px;
}

.custom-tooltip {
  font-size: 12px;
}

::v-deep .v-messages__message {
  color: #f44336;
}

.progress-bar {
  margin-left: 10px;
}

</style>
