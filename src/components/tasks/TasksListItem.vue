<template>
  <div class="task-item">
    <span :class="{ completed: task.completed }">{{ task.title }}</span>
    <div>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-on="on">
            <span
                @click="completeTask"
                class="btn btn-complete"
                :class="{ 'disabled': task.completed }"
                v-bind="attrs"
                :aria-disabled="task.completed ? 'true' : 'false'">
              <i class="ph ph-check"></i>
            </span>
          </span>
        </template>
        <span class="tooltip-size">
          {{ task.completed ? 'This task is already completed' : 'Complete task' }}
        </span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span @click="deleteTask" class="btn btn-delete" v-bind="attrs" v-on="on">
            <i class="ph ph-trash"></i>
          </span>
        </template>
        <span class="tooltip-size">Delete task</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksListItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    completeTask() {
      this.$emit('complete-task', this.task.id);
    },
    deleteTask() {
      this.$emit('delete-task', this.task.id);
    }
  }
}
</script>

<style scoped>
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

.btn-complete {
  color: #4caf50;
}

.btn-complete:hover {
  color: #388e3c;
}

.btn-delete {
  color: #f44336;
}

.btn-delete:hover {
  color: #c62828;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.tooltip-size {
  font-size: 12px;
}
</style>
