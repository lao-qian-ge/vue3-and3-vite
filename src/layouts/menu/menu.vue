<template>
  <div class="menu__logo">
    <div class="menu__logo-icon">
      <img src="@/assets/layout/logo.svg" />
    </div>
    <span v-show="!collapsed">通用后台</span>
  </div>
  <a-menu
    theme="dark"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <create
      :router="item"
      v-for="item in menuStore.menu.menuRouter"
      :key="item.id"
    />
  </a-menu>
</template>
<script lang="ts" setup>
import create from "./menu-create";
import { useRoute } from "vue-router";
import { useMenuStore } from "@/stores/menu";
import { ref, watch, onBeforeMount } from "vue";
defineProps<{
  collapsed: boolean;
}>();
const menuStore = useMenuStore();
const route = useRoute();
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const setMenuKey = () => {
  if (!route.meta.hidden) {
    selectedKeys.value = [route.name as string];
    openKeys.value = [];
    route.matched.forEach((item) => {
      openKeys.value.push(item.name as string);
    });
    // 设置顶部tab(栏目)切换
    menuStore.setId(route.matched[0]["meta"]["id"] as number);
  }
};

onBeforeMount(setMenuKey);
watch(route, setMenuKey);
</script>
<style lang="less" scoped>
.menu__logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  .menu__logo-icon {
    width: 32px;
    margin-right: 8px;
    img {
      display: block;
      width: 100%;
    }
  }
  span {
    display: inline-block;
    font-size: 20px;
    color: #fff;
  }
}
</style>
