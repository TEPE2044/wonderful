<script setup lang="ts">
import { useToast } from 'bootstrap-vue-next';
import { promiseToast } from './selectionToast';
const toast = useToast()


</script>

<template>
  <BButtonGroup>
    <BButton variant="success" @click="promiseToast(toast)"> 选择 </BButton>
  </BButtonGroup>
</template>


