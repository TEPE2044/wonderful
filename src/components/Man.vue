<template>
  <div class="message-bar">
    <div class="notice bar" ref="notice">
      <i class="bi bi-bell"></i>
    </div>
    <hr />
    <div class="mail bar position-relative" ref="mail">
      <i class="bi bi-envelope"></i>
      <BBadge
          dot-indicator
          variant="danger"
          class="position-absolute top-0 start-100 translate-middle"
        />
    </div>
    <hr />
    <div class="user bar" ref="user">
      <i class="bi bi-person"></i>
    </div>
  </div>


</template>

<script setup lang="ts"></script>

<style scoped>
.message-bar {
  display: flex;
  width: 150px;
  border: 1px solid rgba(0, 0, 0, 0.226);
  border-radius: 20px;
  padding: 6px;
  .bar {
    transition: all 0.3s ease;
    will-change: transform;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .bar:hover {
    transform: scale(1.4);
  }
}
</style>
