<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Vcode from "vue3-puzzle-vcode";

const btn = ref(false);
const isShow = ref(false);
const onShow = () => {
  isShow.value = !isShow.value;
};
const onSuccess = () => {
  alert("验证成功");
  isShow.value = !isShow.value;
  btn.value = true; 
};
const onClose = () => {
  isShow.value = false;
};

</script>

<template>
  <button @click="onShow">开始验证</button>
  <div
    class="contianer"
    style="display: flex; justify-content: center; align-items: center"
  >
    <div class="box" v-if="isShow === false">您的内容</div>
    <div class="box box-show" v-if="isShow === true">
      <Vcode :show="isShow" type="inside" @success="onSuccess" />
    </div>
  </div>
</template>

<style scoped>
.box-show {
  border: 1px solid rgba(0, 0, 0, 0.089);
  border-radius: 20px;
  padding: 1.8rem;
}

.giveup {
  margin-top: 1rem;
  transform: translateY(12px);
}
</style>
