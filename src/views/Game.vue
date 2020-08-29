<template lang="pug">
.game(:style='style')
  Board(
    ref='board'
    :cards='cards'
    :size='boardSize'
    @click-card='clickCard'
    @set-status='setStatus'
  )
  Score(:value='score' :combo='combo')
    template(#left)
      router-link.back(:to='{ name: `Home` }')
        i.fas.fa-arrow-left
    template(#right)
      span.status
        transition(name='fade' mode='out-in')
          i.fas.fa-hourglass(v-if='status === `wait`')
          i.match(:class='matchIcon' v-else-if='status === `match`')
</template>

<script>
import Board from '@/modules/classes/board'
import BoardComponent from '@/components/Board.vue'
import Score from '@/components/Score.vue'
import sizes from '@/modules/sizes'
import themes from '@/modules/themes'
import { result } from '../modules/storage'

const randomstring = require('randomstring')

export default {
  components: {
    Board: BoardComponent,
    Score,
  },
  data () {
    return {
      board: null,
      size: null,
      score: null,
      status: null,
      combo: null,
      //
      matchIcon: null,
      themeColor: null,
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    async start () {
      try {
        const { size: sizeIndex, theme: themeIndex } = this.$route.query
        const size = sizes[sizeIndex] ?? sizes[2]
        const patterns = themes[themeIndex]?.patterns

        this.themeColor = patterns[0]?.color
        this.score = size[0] * size[1]
        this.size = size
        this.resetCombo()

        this.board = new Board({ size, patterns }, {
          match: this.match,
          miss: this.miss,
          gameOver: this.gameOver,
        })
        await this.$nextTick()
        this.$refs.board.playWave()
      } catch (err) {
        this.$router.push({ name: 'Home' })
      }
    },
    clickCard (card, by = 'Huang Xingqiao') {
      this.board.click(card, by)
    },
    match () {
      this.setStatus('match')
      const { size } = this
      const value = ~~((size[0] * size[1]) ** .5)
      const extra = (this.combo++) * ~~((size[0] * size[1]) ** .25)

      this.score += (value + extra)
    },
    miss () {
      this.setStatus('miss')
      this.resetCombo()
      const { size } = this
      const value = ~~((size[0] * size[1]) ** .25)
      this.score -= value
    },
    gameOver () {
      const id = randomstring.generate(4)
      const data = {
        score: this.score,
        query: this.$route.query,
      }
      result.save(id, data)
      setTimeout(() => {
        this.$router.push({ name: 'Result', params: { id } })
      }, 1500)
    },
    setStatus (status = null) {
      this.status = status
      this.setMatchIcon()
      if (['match', 'miss'].includes(status)) setTimeout(() => this.setStatus(), 1000)
    },
    setMatchIcon () {
      const icons = [
        'fas fa-grin-stars',
        'fas fa-rocket',
        'fas fa-thumbs-up',
        'fas fa-glass-cheers',
        'fas fa-laugh-squint',
        'fas fa-grin-hearts',
        'fas fa-laugh-wink',
        'fas fa-heart',
        'fas fa-rocket',
        'fas fa-star',
      ]

      this.matchIcon = icons[Math.random() * icons.length >> 0]
    },
    resetCombo () {
      this.combo = 0
    },
  },
  computed: {
    cards () {
      return this?.board?.cards.list
    },
    boardSize () {
      const size = [...(this.size ?? [])]
      return (window.innerWidth < 768)  ? size.reverse() : size
    },
    style () {
      return {
        '--theme-color': this.themeColor,
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.game
  display: flex
  flex-direction: column
  align-items: center

.back, .status
  font-size: 2rem
  color: #{var(--text-color)}

.back
  +reset-button
  font-size: 2rem
  text-decoration: none
  display: inline-block
  +media-breakpoint-down(sm)
    padding: .5rem

.status
  +inline-flex-center
  font-size: 1.75rem
  min-width: 3rem
  .match
    color: $primary

.fade
  &-enter-from, &-leave-to
    opacity: 0
    transform: scale(0)
  &-leave-from, &-enter-to
    opacity: 1
    transform: none
  &-enter-active, &-leave-active
    transition: all .3s
</style>