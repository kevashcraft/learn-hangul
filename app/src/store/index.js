import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import deck from '@/assets/deck.json'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  key: '한글',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    deckGroup: 'Single Consonants',
    cardIdx: 0,
    audioEnabled: true,
    darkTheme: false
  },
  mutations: {
    setDeckGroup (state, deckGroup) {
      state.cardIdx = 0
      state.deckGroup = deckGroup
    },
    incCardIdx (state) {
      let cardCount = 0
      if (state.deckGroup === 'All') {
        Object.keys(deck).forEach(group => {
          cardCount += Object.keys(deck[group]).length
        })
      } else {
        cardCount = Object.keys(deck[state.deckGroup]).length
      }
      if (state.cardIdx >= cardCount - 1) {
        state.cardIdx = 0
      } else {
        state.cardIdx += 1
      }
    },
    toggleAudioEnabled (state) {
      state.audioEnabled = !state.audioEnabled
    },
    toggleDarkTheme (state) {
      state.darkTheme = !state.darkTheme
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    deckGroups () {
      return [...Object.keys(deck), 'All']
    },
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
  },
  plugins: [vuexLocal.plugin]
})
