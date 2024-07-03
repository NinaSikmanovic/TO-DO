<template>
  <v-app>
    <TasksList/>
    <GlobalSnackbar />
  </v-app>
</template>

<script>
import TasksList from "@/components/TasksList.vue";
import GlobalSnackbar from "@/components/GlobalSnackbar.vue";

export default {
  name: 'App',
  components: {
    GlobalSnackbar,
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
