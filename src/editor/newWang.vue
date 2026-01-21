<script setup lang="ts">
import "@wangeditor-next/editor/dist/css/style.css";
import { storeToRefs } from "pinia";
import { editorStore } from "../stores/editor";
import { onMounted, onBeforeUnmount, watchEffect, ref } from "vue";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import type { IToolbarConfig } from "@wangeditor-next/editor";
import { DomEditor } from "@wangeditor-next/editor";
import { useDebounceFn } from "@vueuse/core";
const { editor, valueHTML } = storeToRefs(editorStore());
const { handleCreated, handleChange } = editorStore();
const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    "headerSelect",
    "undo",
    "redo",
    "|",
    "bold",
    "italic",
    "underline",
    "color",
    "|",
    "numberedList",
    "divider",
    "|",
    "emotion",
    {
      key: "group-image",
      title: "图片工具",
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/></g></svg>',
      menuKeys: ["insertImage", "uploadImage", "editImage", "deleteImage"],
    },
    {
      key: "group-video",
      title: "视频工具",
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/></svg>',
      menuKeys: ["insertVideo", "uploadVideo"],
    },
  ],
};
const what = ref(false || JSON.parse(sessionStorage.getItem("what") as any));
const toggleWhat = useDebounceFn(() => {
  what.value = !what.value;
  sessionStorage.setItem("what", JSON.stringify(what.value));
  location.reload();
}, 3000);

const defaultToolBar: Partial<IToolbarConfig> = {};

const editorConfig = { placeholder: "随心写" };
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
  <button @click="toggleWhat()">随心写</button>
  <div class="edit-space">
    <Toolbar
      v-if="what"
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="'default'"
    />
    <Toolbar
      v-else
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="defaultToolBar"
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
