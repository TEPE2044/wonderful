import { createRouter, createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  // 路由滚动行为：默认进入页面回到顶部；返回/前进恢复历史位置；带 hash 时定位锚点
  routes: [
    {
      path: "/",
      name: "rtalk",
      component: () => import("../components/RTalk.vue"),
      children: [
        {
          path: "",
          redirect: { name: "anmt" },
        },
        {
          path: "anmt",
          name: "anmt",
          component: () => import("../components/AnnouncementPanel.vue"),
        },
        {
          path: "mes",
          name: "mes",
          component: () => import("../components/Dialog.vue"),
        },
      ],
    },
  ],
});

export default router