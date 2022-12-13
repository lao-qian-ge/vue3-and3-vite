import { reactive } from "vue";
import { defineStore } from "pinia";
import { constantRouterMap } from "@/router/basics.router";
import type { TabItem, tabList } from "@/types/views/tabs";
import router from "@/router";

export const useTabs = defineStore("tabs", () => {
  const tabs = reactive<tabList>([]);
  const includeList = reactive<string[]>([]);

  /**
   * @desc: 添加tab
   * @param { TabItem } item
   */
  const setList = (item: TabItem) => {
    let result = true;

    // 防止固定路由
    for (let m = 0; m < constantRouterMap.length; m++) {
      if (constantRouterMap[m]["name"] === item.name) {
        result = false;
        break;
      }
    }

    // 防止重复添加
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i]["fullPath"] === item.fullPath) {
        result = false;
        break;
      }
    }

    // 防止添加不存在的路由
    if (!router.hasRoute(item.name || "")) {
      result = false;
    }

    if (result) tabs.push(item);
  };

  /**
   * @desc: 删除tab
   * @param { string } key tabkey
   */
  const delList = (key: string) => {
    const route = router.currentRoute.value;

    if (tabs.length <= 1) {
      return;
    }

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i]["fullPath"] === key) {
        if (route.fullPath === key) {
          if (tabs.length - 1 === i) {
            router.push(tabs[i - 1]["fullPath"]);
          } else {
            router.push(tabs[i + 1]["fullPath"]);
          }
        }
        tabs.splice(i, 1);
        break;
      }
    }
  };

  /**
   * @desc: 删除右侧
   * @param { number } index 选择tab序号
   */
  const delRight = (index: number) => {
    const route = router.currentRoute.value;
    let current = 0;

    if (tabs.length <= 1 || tabs.length - 1 === index) {
      return;
    }

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i]["fullPath"] === route.fullPath) {
        current = i;
        break;
      }
    }

    if (index < current) {
      router.push(tabs[index]["fullPath"]);
    }

    tabs.splice(index + 1, tabs.length - 1);
  };

  /**
   * @desc: 删除左侧
   * @param { number } index 选择tab序号
   */
  const delLeft = (index: number) => {
    const route = router.currentRoute.value;
    let current = 0;

    if (tabs.length <= 1 || index === 0) {
      return;
    }

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i]["fullPath"] === route.fullPath) {
        current = i;
        break;
      }
    }

    if (index > current) {
      router.push(tabs[index]["fullPath"]);
    }

    tabs.splice(0, index);
  };

  /**
   * @desc: 删除其他
   * @param { number } index 选择tab序号
   */
  const delOther = (index: number) => {
    router.push(tabs[index]["fullPath"]);
    tabs.splice(index + 1, tabs.length - 1);
    tabs.splice(0, index);
  };

  /**
   * tab 缓存
   * @param routeName 路由名
   */
  const setKeepAlive = (routeName: string) => {
    if (routeName && !includeList.includes(routeName)) {
      includeList.push(routeName);
    }
  };

  return {
    tabs,
    includeList,
    setList,
    delList,
    delRight,
    delLeft,
    delOther,
    setKeepAlive,
  };
});
