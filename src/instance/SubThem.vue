<template>
  <div v-if="latestBlog">你关注的人发了新博客：{{ latestBlog.title }}</div>
  <div v-else>等待中...</div>
</template>

<script lang="ts" setup>
import { createClient } from "graphql-ws";
import { ref, onUnmounted } from "vue";

/* ---------- 类型 ---------- */
interface Blog {
  blogId: number;
  title: string;
  authorId: number;
}

/* ---------- 客户端 ---------- */
const wsClient = createClient({
  url: "ws://localhost:12404/api/v1/gql/subql",
  shouldRetry: () => true,
});

/* ---------- 钩子 ---------- */
function useBlogSubscription() {
  const latestBlog = ref<Blog | null>(null);

  // 开始订阅，拿到“关闭函数”
  const unsubscribe = wsClient.subscribe<{ blogNewFromFollowing: Blog;}>
  (
    {
      query: `subscription { testFollowing { blogId title authorId } }`,
    },
    {
      next: ({ data }) =>
        (latestBlog.value = data?.blogNewFromFollowing ?? null),
      error: console.error,
      complete: () => {},
    },
  );

  // 组件销毁时停止监听
  onUnmounted(() => unsubscribe());

  return latestBlog;
}

/* ---------- 使用 ---------- */
const latestBlog = useBlogSubscription();
</script>
