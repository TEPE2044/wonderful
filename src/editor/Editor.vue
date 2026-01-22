<script setup lang="ts">
import "@wangeditor-next/editor/dist/css/style.css";
import { storeToRefs } from "pinia";
import { editorStore } from "../stores/editor";
import { onMounted, onBeforeUnmount, watchEffect, ref } from "vue";
import { Editor, Toolbar } from "@wangeditor-next/editor-for-vue";
import type { IToolbarConfig } from "@wangeditor-next/editor";
import { Icon } from "@iconify/vue";
const { editor, valueHTML } = storeToRefs(editorStore());
const { handleCreated, handleChange } = editorStore();
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

const pub_tags = ref<string[]>([]);
</script>
<template>
  <div class="editors mx-auto">
    <div class="title w-100">
      <input class="title-space w-100 border-0 mb-3 px-2" id="floatingTitle" type="text" placeholder="从标题开始吧" />
    </div>

    <div class="edit-space">
      <Toolbar class="toolbar" :editor="editor" :defaultConfig="easyEditor" :mode="'default'" />
      <Editor class="editor" v-model="valueHTML" :mode="'default'" :defaultConfig="editorConfig"
        @onCreated="handleCreated" @onChange="handleChange" />
    </div>
    <div class="tags mt-3 mb-3">
      <BFormTags v-model="pub_tags" :limit="5" remove-on-delete add-button-text="Add" limit-tags-text="最多只能设置5个标签噢"
        input-id="tags-basic" placeholder="设置标签(使用回车确定标签)" />
    </div>
    <div class="options mt-4">
      <!-- 是否转载 -->
      <BPopover placement="bottom">
        <template #target>
          <BButton class="float-end" variant="success"> 发布 </BButton>
        </template>
        <template #title><strong>确认发布 ？</strong></template>
        <BButton size="sm" class="me-2" variant="success">
          <Icon icon="bi-send" /> 发布
        </BButton>
        <BButton size="sm" variant="primary">
          <Icon icon="bi-box" /> 暂存
        </BButton>
      </BPopover>
       <BButton class="float-end me-2" variant="primary" >预览</BButton>
    </div>
  </div>
  <!-- 预览模态框 -->
</template>

<style lang="scss" scoped>
.editors {
  width: 650px;
  min-height: 301px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .title {
    .title-space {
      font-size: 24px;
      outline: none;

      &:focus {
        box-shadow: none;
      }
    }
  }

  .edit-space {
    >.toolbar {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      border-bottom: 2px solid gainsboro;
    }

    >.editor {
      overflow: auto;
      max-height: 400px;
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
