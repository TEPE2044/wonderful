<template>
  <div class="edit-profile border border-dark p-5">
    <BAlert show variant="success">
      请完善您的个人信息，以便我们为您提供更好的服务。
    </BAlert>
    <div class="info">
      <div class="avatar mt-4 d-flex align-items-center justify-content-center">
        <Avatar />
      </div>

      <BForm
        class="d-flex mt-4 flex-column gap-4 align-items-center justify-content-center"
      >
        <BInputGroup prepend="@" class="w-50">
          <BFormInput id="inline-form-input-username" placeholder="用户名" />
        </BInputGroup>
        <BInputGroup class="w-75">
          <BFormInput id="inline-form-input-signature" placeholder="签名" />
        </BInputGroup>
      </BForm>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
