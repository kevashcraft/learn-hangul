<template>
  <v-container style="height: 55px; padding: 0 55px">
    <v-row class="justify-space-between align-center fill-height">
      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-image-multiple</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>One</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>One</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="toggleAudioEnabled">
            <v-list-item-title v-show="audioEnabled">Turn Audio Off</v-list-item-title>
            <v-list-item-title v-show="!audioEnabled">Turn Audio On</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>One</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ActionBar',
  computed: mapState(['audioEnabled', 'deckGroup']),
  methods: mapActions(['toggleAudioEnabled']),
  data: () => ({
  }),
}
</script>
