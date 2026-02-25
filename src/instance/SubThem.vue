<template>
  <div v-if="latestBlog">你关注的人发了新博客：{{ latestBlog.title }}</div>
  <div v-else>等待中...</div>
</template>

<script lang="ts" setup>
import { createClient } from "graphql-ws";
import { ref, onUnmounted, onMounted } from "vue";

/* ---------- 类型 ---------- */
interface Blog {
  blogId: number;
  title: string;
  authorId: number;
}

const DEBUG_RCODE = "uu_PBvXUhH5CLhsanDE1TmlqBrF0jkh8pZxjl461bPw";
const DEBUG_PAYLOAD =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJURVBFMjA0NCIsImlhdCI6MTc3MTkyNTgyNiwiZXhwIjoyMjM4NDg1ODI2LCJzdWIiOiJzcHBELUlGbXNUeWpZTFFXUTczbzRJcmhDNHlKQW9SZGJHalhPQlVRWE91czlxc0dPUGFLIn0.oBuS2cBUkzgF0c6iaXkx5ZheKJSDDVWKGVKQIdP4t70";

/* ---------- 客户端 ---------- */
const getAuthHeaders = () => {
  const rcode =
    localStorage.getItem("rcode") || sessionStorage.getItem("rcode") || DEBUG_RCODE;
  const payload =
    localStorage.getItem("payload") ||
    sessionStorage.getItem("payload") ||
    DEBUG_PAYLOAD;

  return {
    Authorization: rcode ? `Bearer ${rcode}` : "",
    "X-Payload": payload,
  };
};

const wsClient = createClient({
  url: "ws://localhost:12404/api/v1/gql/subql",
  shouldRetry: () => true,
  connectionParams: () => getAuthHeaders(),
});

/* ---------- 钩子 ---------- */
function useBlogSubscription() {
  const latestBlog = ref<Blog | null>(null);

  // 开始订阅，拿到“关闭函数”
  const unsubscribe = wsClient.subscribe<{ testFollowing: Blog }>
  (
    {
      query: `subscription { testFollowing { blogId title authorId } }`,
    },
    {
      next: ({ data }) =>
        (latestBlog.value = data?.testFollowing ?? null),
      error: console.error,
      complete: () => {},
    },
  );
  onMounted(() => useBlogSubscription())

  // 组件销毁时停止监听
  onUnmounted(() => unsubscribe());

  return latestBlog;
}

/* ---------- 使用 ---------- */
const latestBlog = useBlogSubscription();
</script>
