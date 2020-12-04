<template>
  <v-app>
    <v-container class="fill-height" style="padding: 0; max-width: 450px">
      <v-row class="fill-height flex-column">
        <FlashCards class="flex-grow-1" />
        <ActionBar class="flex-grow-0" />
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import ActionBar from './components/ActionBar.vue'
import FlashCards from './components/FlashCards.vue'

import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    ActionBar,
    FlashCards
  },

  computed: mapState(['darkTheme']),

  watch: {
    darkTheme () {
      this.$vuetify.theme.dark = this.darkTheme
    }
  },

  data: () => ({
    //
  }),
};
</script>
