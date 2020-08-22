<template lang="pug">
.size-select
  label Size
  .options
    transition-group(name='option')
      button.option(
        type='button'
        v-for='(i, index) in availableList'
        :key='i'
        @click='change(index)'
        :class='getOptionClass(index)'
      ) {{ i[0] }} × {{ i[1] }}
</template>

<script>
import useSelect from '../modules/useSelect'
import sizes from '@/modules/sizes'

export default {
  props: ['modelValue', 'length'],
  setup (props, context) {
    const { change, getOptionClass } = useSelect(props, context)
    return { change, getOptionClass }
  },
  methods: {
    getIsAvailable ([row, col]) {
      return row * col / 2 <= this.length
    },
    pick () {
      this.change(Math.random() * this.list.length >> 0)
    },
  },
  computed: {
    list: () => sizes,
    availableList () {
      return this.list.filter(i => this.getIsAvailable(i))
    },
    selectedOption () {
      return this.list[this.modelValue]
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler (_) {
        if (!this.list[_]) this.change(2)
      }
    },
    length: {
      immediate: true,
      handler () {
        if (this.modelValue >= this.availableList.length) this.change(this.availableList.length - 1)
      }
    },
  },
}
</script>

<style lang="sass" scoped>
.size-select
  +form-group
  label
    +form-label
  .options
    margin-bottom: 1rem
    button.option
      +reset-button
      +wh(8rem, 4rem)
      +inline-flex-center
      background-color: transparent
      border-radius: 10px
      font-size: 1.75rem
      margin: 0 10px 10px 0
      opacity: .7
      transition: all .3s
      white-space: nowrap
      &.active
        opacity: 1
        background-color: rgba(grey, .1)
      &:active
        transform: scale(.95)
      +media-breakpoint-down(sm)
        font-size: 1.2rem
        margin: 0 5px 5px 0
        +wh(8rem * .6, 4rem * .6)

.option
  &-enter-from, &-leave-to
    transform: scale(0)
    opacity: 0
  &-enter-to, &-leave-from
    transform: scale(1)
  &-enter-active, &-leave-active
    transition: all .2s !important
</style>