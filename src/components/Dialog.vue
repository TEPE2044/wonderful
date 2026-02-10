<script lang="ts" setup>
import { ref } from "vue";

const messages = ref([
  { id: 1, type: "op", name: "傻呗1号", content: "怎么换行？" },
  { id: 2, type: "my", name: "傻呗2号", content: "我tm哪知道" },
]);

const inputText = ref("");

const sendMessage = () => {
  const text = inputText.value.trim();
  if (!text) return;
  messages.value.push({
    id: Date.now(),
    type: "my",
    name: "傻呗2号",
    content: text,
  });
  inputText.value = "";
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key !== "Enter") return;
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault();
    sendMessage();
  }
};
</script>

<template>
  <div
    class="dialog border shadow-sm d-flex rounded-3 flex-column justify-content-center align-items-center mx-auto bg-light"
  >
    <div class="dialog-header border-bottom rounded-2 py-2">
      <div class="name fw-bold d-flex justify-content-center align-item-center">
        小明
      </div>
    </div>
    <div class="dialog-body p-3">
      <div
        v-for="msg in messages"
        :key="msg.id"
        :class="msg.type"
        class="d-flex flex-row align-items-center gap-3"
        :title="msg.name"
      >
        <div class="op-avatar">
          <BAvatar v-if="msg.type === 'op'" />
          <BAvatar v-else src="s.png" />
        </div>

        <div
          :class="msg.type === 'op' ? 'op-box' : 'my-box'"
          class="border rounded p-2"
        >
          <div class="content">{{ msg.content }}</div>
        </div>
      </div>
    </div>
    <div class="dialog-footer border-top p-2">
      <div class="input-group">
        <textarea
          v-model="inputText"
          class="form-control"
          placeholder="输入消息..."
          rows="2"
          style="resize: none;"
          @keydown="handleKeydown"
        ></textarea>
        <button class="btn btn-primary" type="button" @click="sendMessage">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  margin-top: 1rem;
  width: 40rem;
  overflow-y: auto;
  .dialog-header {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.644);
  }
  .dialog-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    overflow-y: auto;
    height: 40rem;
    background-color: rgba(255, 255, 255, 0.644);

    .my-box {
      background-color: aliceblue;
    }
    .op-box,
    .my-box {
      max-width: 30rem;
      flex-wrap: wrap;
      height: fit-content;
      .content {
        width: 100%;
        display: block;
        overflow-wrap: anywhere;
        word-break: break-word;
        white-space: pre-wrap;
      }
    }
  }
  .dialog-footer {
    width: 100%;
    textarea {
      max-height: 150px;
      overflow-y: auto;
    }
  }
}
</style>
