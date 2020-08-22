<template lang="pug">
.board(:class='{ disabled: isPlayingWave }')
  template(v-for='(card, index) in cards' :key='card.id')
    Card.card(
      :card='card'
      :reveal='waveList[index]'
      @click='click(card)'
    )
    .w-100(v-if='!((index + 1) % row)')
</template>

<script>
import Card from './Card.vue'
const delay = require('delay')

export default {
  components: {
    Card,
  },
  props: {
    cards: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Array,
      default: () => [100, 100],
    },
  },
  data () {
    return {
      isPlayingWave: false,
      waveList: [],
    }
  },
  methods: {
    click (card) {
      if (this.isPlayingWave) throw Error('Wave is still playing!')
      this.$emit('click-card', card)
    },
    async playWave () {
      const delayMs = 300
      const duration = 1250
      const interval = 250
      const { waveList } = this
      this.isPlayingWave = true

      const flips = this.cards.map(async (_, index) => {
        await delay(delayMs + index * interval)
        waveList[index] = true
      })
      const folds = this.cards.map(async (_, index) => {
        await delay(delayMs + index * interval + duration)
        waveList[index] = false
      })

      await Promise.all([...flips, ...folds])

      this.isPlayingWave = false
    },
  },
  computed: {
    row () {
      return this.size[0]
    },
    col () {
      return this.size[1]
    },
  },
  watch: {
    cards: {
      immediate: true,
      handler (_) {
        if (!_) return
        this.waveList = Array(_.length).fill().map(() => false)
      },
    },
    async isPlayingWave (_) {
      this.$emit('set-status', _ ? 'wait' : null)
    },
  },
}
</script>

<style lang="sass" scoped>
.board
  display: flex
  justify-content: center
  flex-wrap: wrap
  margin-top: 2rem
  &.disabled
    .card
      cursor: not-allowed !important
  .w-100
    +wh(100%, 0)
  .card
    margin: 5px
    +media-breakpoint-down(sm)
      margin: 2px
  +media-breakpoint-down(sm)
    ::v-deep(.card)
      +wh(3.5rem, 4.9rem)
      font-size: 2.5rem
</style>