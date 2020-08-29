<template lang="pug">
.result(v-if='result')
  .label Score
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
.result
  +flex-center
  flex-direction: column
  height: 100vh
  color: var(--text-color)
  .label
    font-size: 2rem
    text-transform: uppercase
    margin-bottom: 1rem
    transform: skewX(-10deg)
  .score
    font-size: 6rem
    font-weight: bold
    margin-bottom: 2rem

  .buttons
    +flex-center
    button, a
      +flex-center
      +reset-button
      +wh(4rem)
      font-size: 2rem
      &.home
        +wh(7rem)
        font-size: 3.5rem
</style>