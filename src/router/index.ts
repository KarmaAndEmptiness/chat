import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import type {
  RouterOptions,
  RouterHistory,
  RouteRecordRaw,
  Router,
  NavigationGuardWithThis,
  RouteLocationNormalized,
  NavigationGuardReturn,
  _Awaitable,
} from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import { isLogin } from "@/utils/auth";
import authRoutes from "./auth";
const routes: Readonly<RouteRecordRaw[]> = [
  authRoutes,
  {
    path: "/",
    name: "home",
    component: MainLayout,
    meta: { auth: true },
  },
];

const mode: string = import.meta.env.VITE_ROUTER_MODE;
const getHistoryMode = (): RouterHistory => {
  return mode === "hash" ? createWebHashHistory() : createWebHistory();
};

const router: Router = createRouter({
  history: getHistoryMode(),
  routes,
  scrollBehavior: () => ({ top: 0, left: 0 }),
} as RouterOptions);

const authGuard: NavigationGuardWithThis<undefined> = (
  to: RouteLocationNormalized
): _Awaitable<NavigationGuardReturn> => {
  const login = isLogin();
  if (to.meta?.auth && !login) {
    return { path: "/auth/login", query: { redirect: to.fullPath } };
  }
  if (["/auth/login"].includes(to.path) && login) {
    return { path: "/" };
  }
};

router.beforeEach(authGuard);
export default router;
