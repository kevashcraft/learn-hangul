<template>
  <v-container class="elevation-3" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0">
    <v-row class="flex-column fill-height">
      <v-row class="flex-grow-1 justify-center align-center">
        <div style="font-size: 232px;">{{card.letter}}</div>
      </v-row>
      <v-row class="flex-grow-0 justify-center align-center" style="height: 33%;">
        <div style="font-size: 48px">{{card.word}}</div>
      </v-row>
    </v-row>
    <audio :src="card.audio" ref="audio"></audio>
  </v-container>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'FlashCard',
  props: {
    card: Object
  },
  computed: mapState(['audioEnabled']),
  watch: {
    audioEnabled (enabled) {
      if (!enabled) {
        this.$refs['audio'].pause()
      }
    }
  },
  mounted () {
    if (this.audioEnabled) {
      this.$refs['audio'].play()
    }
  },
  beforeDestroy () {
    this.$refs['audio'].pause()
  },
  data: () => ({
  }),
}
</script>
