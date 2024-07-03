<template>
  <v-app>
    <TasksList/>
    <SystemNotification/>
  </v-app>
</template>

<script>
import TasksList from "@/components/tasks/TasksList.vue";
import SystemNotification from "@/components/global/SystemNotification.vue";

export default {
  name: 'App',
  components: {
    SystemNotification,
    TasksList,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
}
</style>
