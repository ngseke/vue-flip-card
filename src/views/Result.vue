<template lang="pug">
.result(v-if='result')
  .label: span Score
  .score {{ result.score }}
  .buttons
    router-link.redo(:to='{ name: `Game`, query: result.query }'): i.fas.fa-redo-alt
    router-link.home(:to='{ name: `Home` }'): i.fas.fa-home
    router-link.dice(:to='{ name: `Random` }'): i.fas.fa-dice

</template>

<script>
import { result } from '../modules/storage'

export default {
  data() {
    return {
      result: null
    }
  },
  mounted () {
    const data = result.load(this.$route.params.id)
    if (data != null) {
      this.result = data
    } else {
      this.$router.push({ name: 'Home' })
    }
  },
}
</script>

<style lang="sass">
@keyframes reveal
  from
    opacity: 0
    transform: scale(0)
  to
    opacity: 1
    transform: none

@keyframes fade
  from
    opacity: 0
  to
    opacity: 1

.result
  +flex-center
  flex-direction: column
  height: 100vh
  color: var(--text-color)
  font-family: $font
  .label
    font-size: 2rem
    text-transform: uppercase
    margin-bottom: 1rem
    animation: reveal .4s .2s both
    span
      display: inline-block
      transform: skewX(-10deg)

  .score
    font-size: 6rem
    font-weight: bold
    margin-bottom: 2rem
    animation: reveal .4s .3s both

  .buttons
    +flex-center
    animation: fade 1s .7s both
    button, a
      +flex-center
      +reset-button
      +wh(4rem)
      font-size: 2rem
      &.home
        +wh(7rem)
        font-size: 3.5rem
</style>