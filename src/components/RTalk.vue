<script setup lang="ts">
import {ref} from 'vue'

const options = [
  {text: '公告', value: 'anmt'},
  {text: '站内信', value: 'mes'},
]

const selected = ref('anmt')


// TODO:1.获取联系人列表接口 2.在未选择任何联系人时缺省页 3.点击联系人后获取聊天记录接口 4.发送消息接口
</script>

<template>
  <div class="rt-talk">
    <div class="rt-header">
      <BFormRadioGroup
        name="swap"
        class="swap"
        v-model="selected"
        :options="options"
        buttons
        button-variant="light"
      >
      </BFormRadioGroup>
    </div>

    <div class="rt-content px-5 mx-auto mt-3">
      <div class="rt-main">
        <Dialog />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rt-talk{
    // margin-top: 7.3rem;
    margin-top: 3rem;
}


.rt-header {
    display: flex;
    align-items: center;
    justify-content: center;
    .swap{

    }
}

</style>
