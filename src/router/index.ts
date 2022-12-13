import { createRouter, createWebHistory } from "vue-router";
// import BasicLayout from "@/layouts/BasicLayout.vue";
import { constantRouterMap } from "@/router/basics.router";
import { permission } from "./permission";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/cid",
    //   name: "cid-report-menu",
    //   component: BasicLayout,
    //   meta: { title: "CID总体数据", keepAlive: false },
    //   children: [
    //     {
    //       path: "/cid/report",
    //       name: "cid-report",
    //       meta: { title: "CID总体数据", keepAlive: false },
    //       component: () => import("@/views/AboutView.vue"),
    //     },
    //   ],
    // },
    ...constantRouterMap,
  ],
});
permission(router);
export default router;
