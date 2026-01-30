<template>
  <div class="fclover">
    <div
      class="clover-box d-flex flex-column justify-content-center align-items-center border rounded"
      v-for="tab in tabs"
      :key="`4clover_${tab.name}`"
    >
      <Icon :icon="tab.icon" width="16" height="16" />
      <div class="name">{{ tab.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";

const tabs = [
  { name: "占位1", icon: "bi:circle" },
  { name: "占位2", icon: "bi:circle" },
  { name: "占位3", icon: "bi:circle" },
  { name: "占位4", icon: "bi:circle" },
];
</script>

<style lang="scss" scoped>
.fclover {
  width: 200px;
  height: 200px;
  display: grid;
  gap: 0.8rem;
  grid-template-columns: repeat(2, 1fr);

  > div {
    will-change: transform;
    transition: transform 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.08);
    }
  }
}
</style>
