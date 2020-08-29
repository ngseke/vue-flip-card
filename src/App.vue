<template lang="pug">
routerView
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap')

body
  background-color: #{var(--bg-color)}

  --text-color: #{$black}
  --bg-color: #{$light-bg}
  --border-color: #{$light-border}
  +dark
    --text-color: #{$white}
    --bg-color: #{$dark-bg}
    --border-color: #{$dark-border}

body, button
  font-family: $font
</style>