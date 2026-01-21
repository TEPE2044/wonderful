<script setup lang="ts">
import "@wangeditor-next/editor/dist/css/style.css";
import { storeToRefs } from "pinia";
import { editorStore } from "../stores/editor";
import { onMounted, onBeforeUnmount, watchEffect } from "vue";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import type { IToolbarConfig } from "@wangeditor-next/editor";
import { DomEditor } from "@wangeditor-next/editor";
const { editor, valueHTML } = storeToRefs(editorStore());
const { handleCreated, handleChange } = editorStore();
const IMAGE_SVG = '<svg viewBox=\"0 0 1024 1024\"><path d=\"M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z\"></path></svg>'
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    {
      key: "group-image",
      title: "图片工具",
      iconSvg:IMAGE_SVG,
      menuKeys: ["insertImage", "uploadImage", "editImage", "deleteImage"],
    },"emotion"
  ],
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
  console.log(valueHTML.value);
});

const printEditToolBar = (editorInstance: any) => {
  const toolbar = DomEditor.getToolbar(editorInstance);
  const curToolbarConfig = toolbar?.getConfig();
  console.log(curToolbarConfig);
};
</script>
<template>
  <button @click="printEditToolBar(editor)">看头</button>
  <div class="edit-space">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="'default'"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHTML"
      :mode="'default'"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped></style>
