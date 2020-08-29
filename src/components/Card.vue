<template lang="pug">
.card(
  :class='cardClass'
  :style='style'
)
  .inner
    .front(:style='frontStyle')
      span {{ face }}
    .back(:style='backStyle')
      //- span {{ face }}
</template>

<script>
const Color = require('color')

export default {
  props: {
    card: Object,
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    fontSize: {
      type: Number,
      default: null,
    },
    reveal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timer: null,
      delayedMiss: false,
    }
  },
  computed: {
    face () {
      return this.card.face
    },
    style () {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        fontSize: this.fontSize + 'px',
      }
    },
    frontStyle () {
      const { color } = this.card
      const shadowColor =  Color(color).fade(.5)

      return {
        '--front-shadow': `0 0 10px 3px ${shadowColor}`
      }
    },
    backStyle () {
      const { color } = this.card
      let start = Color(color)
      let end = Color(color).lighten(.3)

      if (matchMedia('(prefers-color-scheme: dark)').matches) {
        const amount = .5
        start = start.darken(amount)
        end = end.darken(amount)
      }

      return {
        '--back-image': `linear-gradient(45deg, ${start}, ${end})`,
      }
    },
    cardClass () {
      const {
        isFlipped: flip,
        isMatched: match,
        isStale: stale,
      } = this.card
      const {
        delayedMiss: miss,
        reveal: reveal,
      } = this

      return { flip, match, miss, stale, reveal }
    },
    miss () {
      return this.card.isMissed
    },
  },
  watch: {
    miss (_) {
      if (_ && !this.timer) {
        this.delayedMiss = true
        this.timer = setTimeout(() => {
          this.delayedMiss = false
          this.timer = null
        }, 1000)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
$hover-duration: .5s
$flipping-duration: 1s
$back-gradient: linear-gradient(45deg, #ccc, lighten(#ccc, 20%))

=flip-to-front
  transform: rotateY(180deg)

.card
  +wh(5rem, 7rem)
  position: relative
  user-select: none
  perspective: 1000px
  cursor: pointer
  transition: all $hover-duration
  font-size: 3rem
  font-family: $font

  .inner
    +wh(100%)
    position: relative
    transition: transform $flipping-duration
    transform-style: preserve-3d

  .debug
    position: absolute
    top: 0
    transform: translateZ(0)
    font-size: 12px
    font-family: monospace
    z-index: 10000

  .front, .back
    +flex-center
    +wh(100%)
    color: #{var(--text-color)}
    overflow: hidden
    border: solid 1px #ccc
    border-radius: 10px
    position: absolute
    backface-visibility: hidden
    font-weight: 100

  .front
    transition: box-shadow .5s
    transform: rotateY(180deg)
    background-color: #{var(--bg-color)}

  .back
    font-size: 1rem
    transition: box-shadow $hover-duration
    background-image: #{var(--back-image, $back-gradient)}
    color: #{var(--text-color)}

  // 翻到正面
  &.flip, &.reveal
    transition-duration: 1s
    cursor: not-allowed
    .inner
      +flip-to-front

  // 歷史的翻牌
  &.stale
    opacity: .5
    .inner
      +flip-to-front
    &:hover
      transform: none
      cursor: not-allowed

  // 新配對
  &.match
    .inner
      +flip-to-front
      .front
        box-shadow: #{var(--front-shadow, 0 0 10px 3px rgba($primary, .5))}

  &.miss
    .inner
      +flip-to-front

  &:hover
    @media (pointer:fine)
      &:not(.flip):not(.stale)
        transform: scale(1.05)
        .back
          box-shadow: 0 5px 10px rgba(#ccc, 1)
          +dark
            box-shadow: 0 0 10px rgba(#ccc, .5)
</style>