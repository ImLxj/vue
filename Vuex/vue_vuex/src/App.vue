<template>
  <div id="app">
    <home-view></home-view>
    <about-view></about-view>
    <btn></btn>
  </div>
</template>

<script>
import HomeView from '@/views/HomeView'
import AboutView from '@/views/AboutView'
import Btn from '@/views/Btn'
export default {
  name: 'App',
  components: { HomeView, AboutView, Btn }
}
</script>
