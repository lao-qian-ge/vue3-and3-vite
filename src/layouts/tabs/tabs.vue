<template>
  <a-tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    :tabBarGutter="6"
    @tabClick="jump"
    @edit="deltab"
    hide-add
    class="tabs__view"
  >
    <a-tab-pane :key="item.fullPath" v-for="(item, index) in tabList">
      <template #tab>
        <a-dropdown :trigger="['contextmenu']">
          <div style="display: inline-block">{{ item.title }}</div>
          <template #overlay>
            <a-menu @click="condition(item, index, $event)">
              <a-menu-item key="current">关闭当前标签</a-menu-item>
              <a-menu-item key="right">关闭右侧</a-menu-item>
              <a-menu-item key="left">关闭左侧</a-menu-item>
              <a-menu-item key="other">关闭其他</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tab-pane>
  </a-tabs>
  <div class="main__container">
    <router-view v-slot="{ Component }">
      <keep-alive :include="includeList">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { useTabs } from "@/stores/tabs";
import type { TabItem } from "@/types/views/tabs";
import { storeToRefs } from "pinia";
import { watch, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const tabs = useTabs();
const { tabs: tabList, includeList } = storeToRefs(tabs);
// 激活的tab
let activeKey = ref<string>();

const route = useRoute();
const router = useRouter();

watch(route, (to) => {
  tabs.setList({
    fullPath: to.fullPath,
    name: to.name as string,
    title: to.meta.title as string,
  });
  tabs.setKeepAlive(to.name as string);
  activeKey.value = to.fullPath;
});

onBeforeMount(() => {
  tabs.setList({
    fullPath: route.fullPath,
    name: route.name as string,
    title: route.meta.title as string,
  });
  tabs.setKeepAlive(route.name as string);
  activeKey.value = route.fullPath;
});

/**
 * @desc：tab点击
 * @param { string } targetKey 点击的tabKey
 */
const jump = (targetKey: string) => {
  if (route.fullPath !== targetKey) {
    router.push(targetKey);
  }
};

/**
 * @desc：删除tab
 * @param { string } targetKey 点击的tabKey
 * @param { string } action 事件类型
 */
const deltab = (targetKey: string, action: string) => {
  if (action === "remove") {
    tabs.delList(targetKey);
  }
};

/**
 * @desc: 条件删除
 * @param { TabItem } tab tab对象
 * @param { number } index 序号
 */
const condition = (tab: TabItem, index: number, item: any) => {
  switch (item.key) {
    case "current":
      tabs.delList(tab.fullPath);
      break;
    case "right":
      tabs.delRight(index);
      break;
    case "left":
      tabs.delLeft(index);
      break;
    case "other":
      tabs.delOther(index);
      break;
  }
};
</script>
<style lang="less" scoped>
.main__container {
  background-color: #fff;
  min-height: calc(100vh - 187px);
  overflow: hidden;
}
</style>
<style lang="less">
.tabs__view {
  :deep(.ant-tabs-tab) {
    user-select: none;
    padding: 0 16px 0 0 !important;
    .ant-dropdown-trigger {
      padding-left: 16px;
    }
  }
  :deep(.ant-tabs-bar) {
    margin: 0 0 8px 0;
  }
  :deep(.ant-tabs-tab-active) {
    font-weight: normal;
    border-bottom: 1px solid #f0f0f0 !important;
  }
}
</style>
