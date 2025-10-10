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
import { isLogin } from "@/utils/auth";
import authRoutes from "./auth";
import homeRoutes from "./home";

const routes: Readonly<RouteRecordRaw[]> = [authRoutes, homeRoutes];

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
  if (
    ["/auth/login", "/auth/register", "/auth/forget"].includes(to.path) &&
    login
  ) {
    return { path: "/" };
  }
};

router.beforeEach(authGuard);
export default router;
