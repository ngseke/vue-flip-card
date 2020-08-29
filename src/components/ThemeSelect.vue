<template lang="pug">
.size-select
  label
    | Theme
    button(type='button' @click='pick'): i.fas.fa-dice

  .options
    button.option(
      type='button'
      v-for='(i, index) in list'
      @click='change(index)'
      :class='getOptionClass(index)'
    )
      .image
        Card.card(:card='getCard(i, true)')
        Card.card.shadow(:card='getCard(i)')
      .content
        .title
          | {{ i.name }}
          small.length  ({{ getFaces(i).length }})
        .preview: .face(v-for='i in getFaces(i)') {{ i }}
</template>

<script>
import useSelect from '../modules/useSelect'
import themes from '@/modules/themes'
import CardComponent from './Card.vue'
import Card from '../modules/classes/card'

export default {
  components: {
    Card: CardComponent,
  },
  props: ['modelValue'],
  setup (props, context) {
    const { change, getOptionClass } = useSelect(props, context)
    return { change, getOptionClass }
  },
  methods: {
    getCard (theme, isFlip) {
      const card = new Card(theme.patterns[0])
      if (isFlip) card.flip()
      return card
    },
    getFaces ({ patterns }) {
      return patterns.map(({ face }) => face)
    },
    pick () {
      this.change(Math.random() * this.list.length >> 0)
    },
  },
  computed: {
    list: () => themes,
    selectedOption () {
      return this.list[this.modelValue]
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler (_) {
        if (!this.list[_]) this.change(0)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
$card-width: 4rem
$card-height: 5.5rem

.size-select
  +form-group
  font-family: $font
  label
    +form-label

  .options
    display: flex
    flex-wrap: wrap
    margin-bottom: 1rem
    button.option
      +reset-button
      width: 100%
      display: flex
      padding: 1.5rem 2rem
      cursor: pointer
      background-color: transparent
      border-radius: 15px
      opacity: .7
      transition: all .3s
      overflow: hidden
      +media-breakpoint-down(sm)
        padding: 1.25rem 1.5rem
      &:active
        transform: scale(.95)
      +media-breakpoint-up(sm)
        width: 50%
      +media-breakpoint-up(md)
        width: 33%
      &.active
        opacity: 1
        background-color: rgba(grey, .1)

      .image
        $shadow-offset: -20px
        position: relative
        flex: 0 0 auto
        width: auto
        max-width: 100%
        margin-right: 2rem
        transform: translate(-$shadow-offset / 2, -$shadow-offset / 2)
        .card
          z-index: 1
        .shadow
          transform: translate($shadow-offset, $shadow-offset)
          position: absolute
          top: 0
          left: 0
          z-index: 0
        +media-breakpoint-down(sm)
          $shadow-offset: -12px
          transform: translate(-$shadow-offset / 2, -$shadow-offset / 2)
          .shadow
            transform: translate($shadow-offset, $shadow-offset)


        ::v-deep(.card)
          +wh($card-width, $card-height)
          font-size: 2rem
          +media-breakpoint-down(sm)
            +wh($card-width * .7, $card-height * .7)
            font-size: 1.2rem


      .content
        text-align: left
        display: flex
        flex-direction: column
        flex-basis: 0
        flex-grow: 1
        max-width: 100%
        .title
          +line-clamp
          font-size: 1.25rem
          margin-bottom: .25rem
        .preview
          +line-clamp
          .face
            +wh(2rem)
            +inline-flex-center
            font-size: 1.75rem
            font-weight: 100
            overflow: hidden
            +media-breakpoint-down(sm)
              +wh(1.5rem)
              font-size: 1.25rem
</style>