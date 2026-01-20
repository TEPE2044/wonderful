<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import { ref } from "vue";
// 仅供娱乐
const keys = useMagicKeys();
const icannot = ref(false);
const handleCan = () => {
    icannot.value = true
}
</script>
<template>
  <div>请同时按下shift + r</div>
  <div v-if="keys.shift_r?.value">若坎达斯认为你应该是个人类</div>

  <div>请同时按下good</div>
  <button @click="handleCan()">我做不到</button>
  <div v-if="icannot">若坎达斯认为你应该是个人类</div>

  <div>我tm是残疾人</div>
</template>
