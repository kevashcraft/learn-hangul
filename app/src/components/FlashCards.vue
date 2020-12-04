<template>
  <v-container style="padding: 0; position: relative;" @click="flip">
    <transition-group name="list" class="card_container" tag="div">
      <FlashCard v-for="card in cardsArr" :key="card.idx" :card="card" />
    </transition-group>
  </v-container>
</template>
<style lang="scss">
.card_container {
  position: absolute;
  top: 5px;
  right: 15px;
  bottom: 5px;
  left: 15px
}
.list-item {
  // display: block;
  // height: 300px;
  // width: 200px;
  /* border: 1px solid pink; */
  /* margin-right: 10px; */
}
.list-leave-active {
  transition: all .5s;
}
.list-enter-active {
  transition: all .3s;
}
.list-enter {
  opacity: 0;
}
.list-leave-to {
  opacity: 0;
}
/* .list-enter {
  transform: translateY(600px);
} */
.list-leave-to {
  transform: translateX(-600px);
}
.list-leave-active {
  position: absolute;
  // height: 100%;
  // width: 100%
}

</style>

<script>
import FlashCard from './FlashCard'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'FlashCards',
  components: { FlashCard },

  computed: {
    ...mapGetters(['cards']),
    ...mapState(['cardIdx']),
    cardsArr () {
      return [this.cards[this.cardIdx]]
    }
  },
  methods: {
    ...mapMutations(['incCardIdx']),
    flip () {
      this.incCardIdx()
    }
  },
  data: () => ({
    idx: 0
  }),
}
</script>
