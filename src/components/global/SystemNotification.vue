<template>
  <div>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000" right top>
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'SystemNotification',
  computed: {
    ...mapState(['snackbar']),
  },
  methods: {
    ...mapActions('snackbar', ['hideSnackbar']),
    closeSnackbar() {
      this.hideSnackbar();
    },
  },
};
</script>

