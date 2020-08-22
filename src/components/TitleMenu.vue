<template lang="pug">
.menu.container.p-0
  ThemeSelect(ref='themeSelect' v-model='theme')
  SizeSelect(ref='sizeSelect' v-model='size' :length='themeLength')
  .sticky-bottom
    button.submit(type='button' @click='lucky')
      | I'm Feeling Lucky
      i.fas.fa-dice
    hr
    button.submit(type='button' @click='submit')
      | Play
      i.fas.fa-arrow-right
</template>

<script>
import { watch, ref } from 'vue'

import { configs } from '../modules/storage'
import themes from '../modules/themes'

import SizeSelect from './SizeSelect.vue'
import ThemeSelect from './ThemeSelect.vue'

export default {
  setup () {
    const size = ref(2)
    const theme = ref(0)

    watch([size, theme], ([size, theme]) => {
      configs.save({ size, theme })
    }, { immediate: false })

    return{ size, theme }
  },
  components: {
    SizeSelect,
    ThemeSelect,
  },
  props: {
    modelValue: Object,
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const { size, theme } = configs.load()
      if (size != null) this.size = size
      if (theme != null) this.theme = theme
    },
    submit () {
      const { size, theme } = this
      this.$router.push({
        name: 'Game',
        query: { size: size, theme },
      })
    },
    lucky () {
      this.$refs.themeSelect.pick()
      this.$refs.sizeSelect.pick()
      this.submit()
    },
    getThemeLength (theme) {
      return theme?.patterns?.length
    },
  },
  computed: {
    themeLength () {
      return this.getThemeLength(themes?.[this.theme])
    },
  },
}
</script>

<style lang="sass" scoped>
.menu
  .sticky-bottom
    display: flex
    justify-content: flex-end
    align-items: center
    background-color: #{var(--bg-color)}
    width: 100%
    position: sticky
    bottom: 0
    padding: 1.5rem 1rem
    border-top: 1px solid #{var(--border-color)}
    z-index: 100
    +media-breakpoint-down(sm)
      padding: 0rem
    hr
      +wh(0, 2rem)
      margin: 0 1.5rem
      padding: 0
      border: none
      border-right: 1px solid #{var(--border-color)}
      +media-breakpoint-down(sm)
        margin: 0 .25rem

  button
    +reset-button
    white-space: nowrap
    background-color: transparent
    font-size: 2rem
    font-weight: 500
    +media-breakpoint-down(sm)
      font-size: 1.25rem
      padding: 1rem .5rem
    i
      margin-left: .5rem
</style>