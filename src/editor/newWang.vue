<script setup lang="ts">
import "@wangeditor-next/editor/dist/css/style.css";
import { storeToRefs } from "pinia";
import { editorStore } from "../stores/editor";
import { onMounted, onBeforeUnmount, watchEffect } from "vue";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import type { IDomEditor, IToolbarConfig } from "@wangeditor-next/editor";
const { editor, valueHTML } = storeToRefs(editorStore());
const { handleCreated,handleChange } = editorStore();
// 工具栏
const toolbarConfig:Partial<IToolbarConfig> = {

};
const editorConfig = { placeholder: "请输入内容..." };
onMounted(() => {
  valueHTML.value = "";
});
onBeforeUnmount(() => {

  const temp = editor.value;
  if (temp == null) return;
  temp.destroy();
});
watchEffect(() => {
    console.log(valueHTML.value)
})
</script>
<template>
  <div class="edit-space">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="'simple'"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHTML"
      :defaultConfig="editorConfig"
      :mode="'simple'"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped></style>
