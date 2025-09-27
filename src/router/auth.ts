import type { RouteRecordRaw } from "vue-router";
const authRoutes: RouteRecordRaw = {
  path: "/auth",
  name: "auth",
  redirect: "/auth/register",
  component: () => import("@/views/auth/Layout.vue"),
  children: [
    {
      path: "/auth/login",
      meta: { auth: false },
      component: () => import("@/views/auth/Login.vue"),
    },
    {
      path: "/auth/register",
      meta: { auth: false },
      component: () => import("@/views/auth/Register.vue"),
    },
    {
      path: "/auth/forget",
      meta: { auth: false },
      component: () => import("@/views/auth/Forget.vue"),
    },
  ],
};
export default authRoutes;
