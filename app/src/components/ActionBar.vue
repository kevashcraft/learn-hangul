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
          <v-list-item v-for="groupName in deckGroups" :key="groupName"
            @click="setDeckGroup(groupName)"
            :class="deckGroup === groupName ? 'deck-selected' : ''">
            <v-list-item-title v-text="groupName"></v-list-item-title>
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
          <v-list-item @click="toggleDarkTheme">
            <v-list-item-title v-show="darkTheme">Light Theme</v-list-item-title>
            <v-list-item-title v-show="!darkTheme">Dark Theme</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-row>
  </v-container>
</template>

<style>
.deck-selected {
  background: rgb(0,0,0,.2)
}
</style>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'ActionBar',
  computed: {
    ...mapGetters(['deckGroups']),
    ...mapState(['audioEnabled', 'darkTheme', 'deckGroup'])
  },
  methods: mapMutations(['setDeckGroup', 'toggleAudioEnabled', 'toggleDarkTheme']),
  data: () => ({
  }),
}
</script>
