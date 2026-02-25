<script setup lang="ts">
import "@wangeditor-next/editor/dist/css/style.css";
import { storeToRefs } from "pinia";
import { editorStore } from "../stores/editor";
import { onMounted, onBeforeUnmount, watchEffect, ref } from "vue";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import type { IToolbarConfig } from "@wangeditor-next/editor";
import { DomEditor } from "@wangeditor-next/editor";
// import { useDebounceFn } from "@vueuse/core";
const { editor, valueHTML } = storeToRefs(editorStore());
const { handleCreated, handleChange } = editorStore();
// const easyEditor: Partial<IToolbarConfig> = {
//   toolbarKeys: [
//     "headerSelect",
//     "undo",
//     "redo",
//     "|",
//     "bold",
//     "italic",
//     "underline",
//     "color",
//     "|",
//     "numberedList",
//     "divider",
//     "|",
//     "emotion",
//     {
//       key: "group-image",
//       title: "图片工具",
//       iconSvg:
//         '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/></g></svg>',
//       menuKeys: ["insertImage", "uploadImage", "editImage", "deleteImage"],
//     },
//     {
//       key: "group-video",
//       title: "视频工具",
//       iconSvg:
//         '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/></svg>',
//       menuKeys: ["insertVideo"],
//       // 暂不支持本地上传视频 menuKeys: ["insertVideo", "uploadVideo"],
//     },
//     "insertLink",
//   ],
// };
// const what = ref(false || JSON.parse(sessionStorage.getItem("what") as any));
// // const toggleWhat = useDebounceFn(() => {
//   what.value = !what.value;
//   sessionStorage.setItem("what", JSON.stringify(what.value));
//   location.reload();
// }, 500);

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

const pub_tags = ref<string[]>([]);
</script>
<template>
  <button @click="printEditToolBar(editor)">看头</button>
  <!-- <button @click="toggleWhat()">随心写</button> -->
  <div class="edit-space">
    <!-- <Toolbar
      v-if="what"
      class="toolbar"
      style="border-bottom: 1px solid #ccc;"
      :editor="editor"
      :defaultConfig="easyEditor"
      :mode="'default'"
    /> -->
    <!-- <Toolbar
      class="toolbar"
      :editor="editor"
      :defaultConfig="easyEditor"
      :mode="'default'"
    /> -->
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="defaultToolBar"
    />
    <Editor
      class="editor"
      v-model="valueHTML"
      :mode="'default'"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
    <div class="tags mt-3">
      <BFormTags v-model="pub_tags" :limit="5" remove-on-delete input-id="tags-basic" placeholder="设置标签" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-space {
  width: 650px;
  height: fit-content;
  > .editor {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-bottom: 1px solid rgb(211, 211, 211);
    height: 600px;
  }
  > .toolbar {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border: 1px solid rgb(173, 168, 168);
    border-bottom: 2px solid gainsboro;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .editor,
  .toolbar,
  tags {
    width: 650px;
  }
}
</style>
