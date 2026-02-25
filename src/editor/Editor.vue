<script setup lang="ts">
import "@wangeditor-next/editor/dist/css/style.css";
import reapi from "../instance/reapi";
import { storeToRefs } from "pinia";
import { editorStore } from "../stores/editor";
import { onMounted, onBeforeUnmount, watchEffect } from "vue";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import type { IEditorConfig, IToolbarConfig } from "@wangeditor-next/editor";
// import { useToggle } from "bootstrap-vue-next";
const { editor, valueHTML } = storeToRefs(editorStore());
const { handleCreated, handleChange } = editorStore();
// TODO:tag长度限制、专业模式->开启MarkDown、新手指引、自动保存、退出前保存、挂机保存、XSS过滤、CRUD、草稿、评论
// const epw = useToggle("preview");
// const preview = () => {
//   if (pub_title.value !== "") {
//     epw.show();
//   }
//   console.log("标题为空");
// };

const easyEditor: Partial<IToolbarConfig> = {
  toolbarKeys: [
    {
      key: "group-image",
      title: "图片工具",
      iconSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/><path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71l-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54L1 12.5v-9a.5.5 0 0 1 .5-.5z"/></g></svg>',
      menuKeys: ["insertImage", "uploadImage"],
    },
    "emotion",
    "insertVideo",
    "insertLink",
    "|",
    "bold",
    "italic",
    "underline",
    "color",
    "|",
    "numberedList",
    "divider",
    "|",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    // {
    //   key: "group-video",
    //   title: "视频工具",
    //   iconSvg:
    //     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/></svg>',
    //   menuKeys: ["insertVideo"],
    //   // 暂不支持本地上传视频 menuKeys: ["insertVideo", "uploadVideo"],
    // },
  ],
};

const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    uploadImage: {
      metaWithUrl: false,
      onSuccess: () => {},
      onFailed: () => {},
      onError: () => {},
      base64LimitSize: 0,
      customUpload: async (file: any, insertFn: any) => {
        // 前端拦截图片类型
        const form = new FormData();
        form.append("img", file);

        try {
          const { data: res } = await reapi({
            url: "/blog/upload/img",
            method: "POST",
            data: form,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.errno === 0) {
            // insertFn 会把图片插到编辑器
            insertFn(res.data.url, res.data.alt || "", res.data.url);
          } else {
            alert(res.message || "上传失败");
          }
        } catch (e) {
          console.error(e);
        }
      },
    },
  },
};
onMounted(() => {
  valueHTML.value = "";
});

onBeforeUnmount(() => {
  const temp = editor.value;
  if (temp == null) return;
  temp.destroy();
  editor.value = undefined;
});
watchEffect(() => {
  console.log(valueHTML.value);
});
</script>
<template>
  <div class="editors mx-auto">
    <div class="edit-space">
      <Editor
        class="editor"
        v-model="valueHTML"
        :mode="'default'"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
    <Toolbar
      class="toolbar"
      :editor="editor"
      :defaultConfig="easyEditor"
      :mode="'default'"
    />
  </div>
</template>

<style lang="scss" scoped>
.editors {
  width: 650px;
  min-height: 301px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .edit-space {
    > .toolbar {
      display: flex;
      flex-direction: column;
      border-bottom: 2px solid gainsboro;
    }

    > .editor {
      overflow-y: auto;
      min-height: 400px;
      max-height: 600px;
      border-top: 1px solid rgb(211, 211, 211);
      border-bottom: 2px solid gainsboro;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    .editor,
    .toolbar {
      width: 600px;
    }
  }

  .tags {
    width: 600px;
  }
}
</style>
