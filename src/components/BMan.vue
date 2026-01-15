<script setup lang="ts">
import { shallowRef } from "vue";

const sys = shallowRef(false);
</script>
<template>
  <div
    class="message-bar bg-light border rounded d-flex justify-content-around align-items-center p-2 gap-2"
  >
    <BButton @click="sys = !sys" class="position-relative" variant="light">
      <i class="bi bi-bell"></i>
      <BBadge
        v-show="sys"
        dot-indicator
        variant="danger"
        class="position-absolute top-0 start-100 translate-middle"
      />
    </BButton>
    <BButton class="position-relative" variant="light">
      <i class="bi bi-envelope"></i>
    </BButton>
    <BDropdown
      auto-close="inside"
      offset="15"
      variant="light"
      toggle-class="text-decoration-none"
      class="position-relative "
      no-caret
    >
      <template #button-content>
        <i class="bi bi-person-circle"></i>
      </template>

      <div class="rs-dropdown-card">
        <div class="avatar d-flex flex justify-content-center align-items-center">
          <BAvatar/>
        </div>
        <div class="info d-flex flex justify-content-center align-items-center">
          <BLink class="name mt-1">梦璃東</BLink>
        </div>
      </div>
      <BDropdownDivider />
      <BDropdownItem><i class="bi bi-shop"></i> 积分商城</BDropdownItem>
      <BDropdownItem><i class="bi bi-upload"></i> 投稿管理</BDropdownItem>
      <BDropdownItem><i class="bi bi-patch-question"></i> 帮助</BDropdownItem>
      <BDropdownDivider />
      <BDropdownItem
        ><i class="bi bi-box-arrow-left"></i> 退出登录</BDropdownItem
      >
    </BDropdown>
  </div>
</template>

<style scoped></style>
