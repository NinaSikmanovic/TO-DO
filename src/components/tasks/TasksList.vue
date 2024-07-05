<template>
  <v-container>
    <div class="tasks-list-container">
      <div class="tasks-top-section">
        <div class="tasks-heading"> TO DO:</div>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <span @click="openNewTaskDialog" class="btn btn-plus" v-bind="attrs" v-on="on">
              <i class="ph ph-plus-circle"></i>
            </span>
          </template>
          <span class="tooltip-size">Add task</span>
        </v-tooltip>
      </div>

      <ProgressBar v-if="loading"/>

      <div v-if="tasks && tasks.length > 0">
        <TasksListItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @complete-task="completeTask"
            @delete-task="openConfirmDialog"
        />
      </div>

      <div v-else>
        <template v-if="!loading">
          Your to-do list is empty. Add a new task to start organizing your to-dos.
        </template>
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

import {TasksService} from "@/services/tasksService";
import {mapActions} from "vuex";
import ProgressBar from "@/components/global/ProgressBar.vue";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog.vue";
import NewTaskDialog from "@/components/dialogs/NewTaskDialog.vue";
import TasksListItem from "@/components/tasks/TasksListItem.vue";

export default {
  name: 'TasksList',
  components: {TasksListItem, NewTaskDialog, ConfirmDialog, ProgressBar},
  data() {
    return {
      tasks: [],
      loading: true,
      saving: false,
      taskId: null,
      confirmDialog: false,
      newTaskDialog: false,
      newTaskTitle: '',
      counter: 0,
      snackbar: {
        visible: false,
        message: '',
      },
      deleteTaskMessage: "Are you sure you want to delete this task?"
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    ...mapActions('snackbar', ['showSnackbar']),
    getTasks() {
      TasksService.getTasks()
          .then((response) => {
            this.tasks = response.data;
            this.sortTasks();
          })
          .catch(() => {
            this.showSnackbar({text: 'An unexpected error has occurred. Please try again.', color: 'error'});
          })
          .finally(() => {
            this.loading = false;
          });
    },

    completeTask(id) {
      const body = {
        id: id,
        completed: true
      }
      TasksService.completeTask(body)
          .then(() => {
            this.updateTaskCompletionStatus(id);
            this.sortTasks();
          })
          .catch(() => {
            this.showSnackbar({text: 'An unexpected error has occurred. Please try again.', color: 'error'});
          })
    },

    deleteTask(id) {
      TasksService.deleteTask(id)
          .then(() => {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.showSnackbar({text: 'Task deleted successfully', color: 'success'});
          })
          .catch(() => {
            this.showSnackbar({text: 'An unexpected error has occurred. Please try again.', color: 'error'});
          })
    },

    saveTask(taskTitle) {
      this.saving = true;
      const body = {
        title: taskTitle
      }
      TasksService.saveTask(body)
          .then(() => {
            this.addTaskToList(taskTitle);
            this.newTaskDialog = false;
            this.sortTasks();
            this.showSnackbar({text: 'Task saved successfully', color: 'success'});
          })
          .catch(() => {
            this.showSnackbar({text: 'An unexpected error has occurred. Please try again.', color: 'error'});
          })
          .finally(() => {
            this.saving = false;
          });
    },

    sortTasks() {
      this.tasks = this.tasks.sort((a, b) => a.completed - b.completed);
    },

    addTaskToList(taskTitle) {
      const id = this.generateId();
      const newTask = {
        id: id,
        title: taskTitle,
        completed: false,
      };
      this.tasks.push(newTask);
      this.counter++;
    },

    updateTaskCompletionStatus(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },

    generateId() {
      return 10 + this.counter + 1;
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

.tasks-heading {
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

.btn {
  cursor: pointer;
  margin-left: 0.5rem;
  transition: color 0.3s ease;

  i {
    font-size: 24px;
  }
}

.btn-plus {
  float: right;
}

.tooltip-size {
  font-size: 12px;
}

</style>
