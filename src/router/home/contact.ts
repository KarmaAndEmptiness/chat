import type { RouteRecordRaw } from "vue-router";

const contactRoutes: RouteRecordRaw = {
  path: "/contact",
  name: "contact",
  meta: { auth: true, title: "通讯录" },
  redirect: "/contact/friend",
  component: () => import("@/views/contact/Layout.vue"),
  children: [
    {
      path: "friend",
      name: "friend",
      component: () => import("@/views/contact/Friend.vue"),
    },
  ],
};
export default contactRoutes;
