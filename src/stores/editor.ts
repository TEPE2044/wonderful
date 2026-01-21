import type { IDomEditor } from "@wangeditor-next/editor";
import { defineStore } from "pinia";
import { ref, shallowRef } from "vue";
import { Boot } from "@wangeditor-next/editor";
import markdownModule from "@wangeditor-next/plugin-markdown";
export const editorStore = defineStore("editor", () => {
  // markdown支持
  Boot.registerModule(markdownModule);
  // 编辑器实例
  const editor = shallowRef<IDomEditor>();

  // 内容
  const valueHTML = ref<string>("");

  // 记录 editor 实例，重要！
  const handleCreated = (editorInstance: IDomEditor) => {
    editor.value = editorInstance;
  };
  // 回调啥？
  const handleChange = (editorInstance: IDomEditor) => {
    valueHTML.value = editorInstance.getHtml();
  };

  return {
    editor,
    valueHTML,
    handleCreated,
    handleChange,
  };
});
