import type { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import contactRoutes from "./contact";
import settingRoutes from "./setting";

const homeRoutes: RouteRecordRaw = {
  path: "/",
  name: "home",
  meta: { auth: true },
  component: MainLayout,
  redirect: "/message",
  children: [
    {
      path: "/message",
      name: "message",
      meta: { auth: true, title: "消息" },
      component: () => import("@/views/message/index.vue"),
    },
    contactRoutes,
    {
      path: "/note",
      name: "note",
      meta: { auth: true, title: "笔记" },
      component: () => import("@/views/note/index.vue"),
    },
    settingRoutes
  ],
};
export default homeRoutes;
