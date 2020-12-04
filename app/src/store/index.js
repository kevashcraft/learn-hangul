import Vue from 'vue'
import Vuex from 'vuex'

import deck from '@/assets/deck.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deckGroup: 'Single Consonants',
    audioEnabled: true
  },
  mutations: {
    setDeckGroup (state, deckGroup) {
      state.deckGroup = deckGroup
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    cards (state) {
      const cards = []
      if (state.deckGroup === 'All') {
        Object.keys(deck).forEach((group, gidx) => {
          Object.keys(deck[group]).forEach((letter, lidx) => {
            cards.push({
              letter,
              idx: gidx+lidx,
              ...deck[group][letter]
            })
          })
        })
      } else {
        Object.keys(deck[state.deckGroup]).forEach((letter, idx) => {
          cards.push({
            letter,
            idx,
            ...deck[state.deckGroup][letter]
          })
        })
      }

      return cards
    }
  }
})
