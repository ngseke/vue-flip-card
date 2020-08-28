<template lang="pug">
div
  TitleMenu(ref='menu' v-show='false')
</template>

<script>
import TitleMenu from '../components/TitleMenu'
export default {
  components: {
    TitleMenu,
  },
  mounted () {
    this.$refs.menu.lucky()
  },
}
</script>