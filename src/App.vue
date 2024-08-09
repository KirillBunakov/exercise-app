<template>
  <the-navbar></the-navbar>
  <router-view/>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'

export default {
  setup () {
    return {
    }
  },
  components: { TheNavbar }
}
</script>

<style lang="scss">

</style>
