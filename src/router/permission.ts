import { whiteList } from "@/router/basics.router";
import type { Router, RouteRecordRaw } from "vue-router";
import { useUser } from "@/stores/user";
import { message } from "ant-design-vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import { useMenuStore } from "@/stores/menu";

const loginPath = "/login";
const defultPath = "/";

// 权限验证
let hasImportRoute = false;
export const permission = (router: Router) => {
  router.beforeEach((to, from, next) => {
    NProgress.start();
    const user = useUser();
    if (user.userInfo.token) {
      if (to.path === loginPath) {
        next({ path: defultPath });
      } else {
        if (!hasImportRoute) {
          user
            .getUserInfo()
            .then(() => {
              user.getMenu().then((res) => {
                hasImportRoute = true;
                res.forEach((item: RouteRecordRaw) => {
                  router.addRoute(item);
                });
                router.addRoute({ path: "/:pathMatch(.*)*", redirect: "/404" });
                const redirect = from.query.redirect as string | undefined;
                if (redirect && to.fullPath === redirect) {
                  next({ ...to, replace: true });
                } else {
                  next({ ...to });
                }
              });
            })
            .catch((err) => {
              message.error(err.message || err.data.message);
              user.userInfo.token = "";
              next({ path: loginPath, query: { redirect: to.fullPath } });
            });
        } else {
          next();
        }
      }
    } else {
      if (whiteList.includes(to.path)) {
        next();
      } else {
        next({ path: loginPath, query: { redirect: to.fullPath } });
      }
    }
  });

  router.afterEach(() => {
    // 关闭进度条
    NProgress.done();
  });
};
