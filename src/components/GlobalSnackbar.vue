<template>
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000" right top>
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script>
import { mapState} from 'vuex';

export default {
  name: 'GlobalSnackbar',
  computed: {
    ...mapState(['snackbar']),
  },
};
</script>

