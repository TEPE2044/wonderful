<template>
  
  <div class="main">
    <BotCheck/>
    <MusicPlayer2 />
  </div>
  
  <!-- <MusicCard/> -->
</template>

<script setup lang="ts">
import MusicPlayer2 from "./components/MusicPlayer2.vue";
import BotCheck from "./instance/bot-check.vue";

// import MusicCard from './BCard/MusicCard.vue';
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
}
</style>
