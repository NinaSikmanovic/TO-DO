<template>
  <v-container>
    <div class="tasks-list-container">
      <div class="tasks-top-section">
        <div class="tasks-title"> TO DO:</div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span @click="openNewTaskDialog" class="btn plus-btn" v-bind="attrs" v-on="on">
              <i class="ph ph-plus-circle"></i>
            </span>
          </template>
          <span class="custom-tooltip">Add task</span>
        </v-tooltip>
      </div>

      <ProgressBar v-if="loading"/>

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
              <span @click="openConfirmDialog(task.id)" class="btn delete-btn" v-bind="attrs" v-on="on">
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

    <ConfirmDialog
        v-if="confirmDialog"
        :is-open="confirmDialog"
        :message="deleteTaskMessage"
        @close="closeConfirmDialog"
        @confirm="confirmDelete"
    />

    <NewTaskDialog
        v-if="newTaskDialog"
        :is-open="newTaskDialog"
        :loading="saving"
        @close="closeNewTaskDialog"
        @save-task="saveTask"
    />

  </v-container>
</template>

<script>

import {TasksService} from "@/services/TasksService";
import {mapActions} from "vuex";
import ProgressBar from "@/components/global/ProgressBar.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import NewTaskDialog from "@/components/dialogs/NewTaskDialog.vue";

export default {
  name: 'TasksList',
  components: {NewTaskDialog, ConfirmDialog, ProgressBar},
  created() {
    this.getTasks();
  },
  data() {
    return {
      deleteOrganisationModal: false,
      tasks: [],
      loading: false,
      saving: false,
      error: null,
      taskId: null,
      confirmDialog: false,
      newTaskDialog: false,
      newTaskTitle: '',
      snackbar: {
        visible: false,
        message: '',
      },
      deleteTaskMessage: "Are you sure you want to delete this task?"
    };
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    async getTasks() {
      try {
        this.loading = true;
        const response = await TasksService.getTasks();
        this.tasks = response.data.sort((a, b) => a.completed - b.completed);
      } catch (error) {
        this.showSnackbar({text: 'Something went wrong.', color: 'error'});
      } finally {
        this.loading = false;
      }
    },

    async completeTask(id) {
      try {
        const body = {
          id: id,
          completed: true
        }

        await TasksService.completeTask(body);
        const task = this.tasks.find(task => task.id === id);
        if (task) {
          task.completed = !task.completed;
        }
        this.tasks = this.tasks.sort((a, b) => a.completed - b.completed);
      }catch (error) {
        this.showSnackbar({text: 'Something went wrong.', color: 'error'});
      }
    },

    async deleteTask(id) {
      try {
        await TasksService.deleteTask(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.showSnackbar({text: 'Task deleted successfully', color: 'success'});
      } catch (error) {
        this.showSnackbar({text: 'Something went wrong.', color: 'error'});
      } finally {
        this.loading = false;
      }

    },

    openConfirmDialog(taskId) {
      this.confirmDialog = true;
      this.taskId = taskId;
    },

    closeConfirmDialog() {
      this.confirmDialog = false;
    },

    confirmDelete() {
      this.deleteTask(this.taskId);
      this.confirmDialog = false;
    },

    openNewTaskDialog() {
      this.newTaskDialog = true;
    },

    closeNewTaskDialog() {
      this.newTaskDialog = false;
    },

    async saveTask(taskTitle) {

      this.saving = true;
      const body = {
        title: taskTitle
      }

      try {
        await TasksService.saveTask(body);
        const newTask = {
          id: this.tasks.length + 1,
          title: taskTitle,
          completed: false,
        };
        this.tasks.push(newTask);
        this.newTaskDialog = false;
        this.tasks = this.tasks.sort((a, b) => a.completed - b.completed);
        this.showSnackbar({text: 'Task saved successfully', color: 'success'});
      } catch (error) {
        this.showSnackbar({text: 'Something went wrong.', color: 'error'});
      } finally {
        this.saving = false;
      }
    },
  },
}
</script>

<style scoped>

.tasks-list-container {
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

.tasks-title {
  font-size: 16px;
  font-weight: 800;
  padding-bottom: 10px;
  padding-left: 4px;
}

.tasks-top-section {
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
