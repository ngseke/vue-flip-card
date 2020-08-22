<template lang="pug">
.score-board
  .tool.left: slot(name='left')
  .score(:class='scoreClass' )
    .current(:key='value') {{ displayValue }}
    .diff(:key='diff.id' v-if='diff') {{ diffText }}
  .tool.right: slot(name='right')
</template>

<script>
export default {
  props: {
    value: Number,
  },
  data() {
    return {
      diff: null,
      displayValue: this.value,
    }
  },
  computed: {
    bind () {
      return {
        value: this.value,
        duration: 300,
      }
    },
    scoreClass () {
      const { isDiffPositive } = this
      return {
        add: isDiffPositive,
        minus: !isDiffPositive,
      }
    },
    diffText () {
      const { diff } = this
      if (!diff) return
      const { value } = diff
      return (value >= 0) ? `+${value}` : `${value}`
    },
    isDiffPositive () {
      const { diff } = this
      if (!diff) return true
      return diff.value >= 0
    },
  },
  watch: {
    value (value, old) {
      setTimeout(
        () => this.displayValue = value,
        (old == null) ? 0 : 800
      )
      const diff = value - old
      if (diff && old != null) this.diff = { value: diff, id: Symbol() }
    },
  },
}
</script>

<style lang="sass" scoped>
$green: #90be6d
$red: #f94144

=change($name, $color)
  @keyframes change-#{$name}
    0%, 100%
      transform: none
    50%
      transform: scale(1.1)
      color: $color

+change('add', darken($green, 20%))
+change('minus', darken($red, 30%))

@keyframes diff
  0%
    transform: translateY(-1.3rem) scale(0)
    opacity: 0
  30%, 60%
    transform: translateY(-1.3rem)
    opacity: 1
  100%
    transform: translateY(.5rem) scale(0)
    opacity: 0

.score-board
  padding: 2rem 0
  min-width: 20rem
  display: flex
  align-items: center
  justify-content: space-between
  .tool
    min-width: 5rem
    &.left
      text-align: left
    &.right
      text-align: right
  .score
    position: relative
    color: #{var(--text-color)}
    .current
      font-size: 2rem
      font-weight: bold
      animation: change .7s .7s
      animation-fill-mode: both
    .diff
      position: absolute
      top: 0
      left: 0
      width: 100%
      text-align: center
      font-size: 1.2rem
      animation: diff 1s
      animation-fill-mode: both
    &.add
      .current
        animation-name: change-add
      .diff
        color: $green
    &.minus
      .current
        animation-name: change-minus
      .diff
        color: $red
  +media-breakpoint-down(sm)
    width: 100%
    padding: 2rem 1rem
</style>