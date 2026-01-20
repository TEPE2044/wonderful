<script setup>
import { set, useGeolocation } from "@vueuse/core";
import { onMounted, ref } from "vue";
ref;

const { isSupported, error, coords, pause, resume } = useGeolocation();

const isGetting = ref(false);
const getGeo = async () => {
  resume();
  isGetting.value = set(true);
  await fetch(
    `https://cn.apihz.cn/api/other/jwjuhe2.php?id=10012322&key=53a962ebbf5f58df8dfee1e3a63842e0&lon=${coords.value.longitude}&lat=${coords.value.latitude}`,
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
  pause;
  isGetting.value = set(false);
};

onMounted(() => {
  pause();
  coords.value.latitude = 0;
  coords.value.longitude = 0;
  console.log(coords.value);
});
</script>

<template>
  <button @click="getGeo()">开始获取位置</button>

  <div v-if="!isSupported">浏览器不支持地理位置 API</div>
  <div v-else-if="error">错误: {{ error.message }}</div>
  <div v-else>纬度: {{ coords.latitude }}, 经度: {{ coords.longitude }}
  </div>
</template>
