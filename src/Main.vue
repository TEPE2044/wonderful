<template>
  
  <div class="main">
    <RouterView />
  </div>
  <SubThem/>
</template>

<script setup lang="ts">
import SubThem from './instance/SubThem.vue';

</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-color: aliceblue;
}
</style>
