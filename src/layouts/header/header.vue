<template>
  <div class="layout__header">
    <div class="header__left">
      <menu-unfold-outlined
        v-if="collapsed"
        class="trigger"
        @click="$emit('update:collapsed', !collapsed)"
      />
      <menu-fold-outlined
        v-else
        class="trigger"
        @click="$emit('update:collapsed', !collapsed)"
      />
      <div class="group__tabs">
        <a-tabs :activeKey="activeKey" @tabClick="tabClick">
          <a-tab-pane v-for="item in routers" :key="item.id" :tab="item.name" />
        </a-tabs>
      </div>
    </div>
    <div class="header__right">
      <a-dropdown :trigger="['click', 'hover']">
        <div class="header__avatar">
          <a-avatar>
            <template #icon>
              <img :src="userInfo.avatar" v-if="userInfo.avatar.length > 0" />
              <img src="@/assets/layout/avatar.png" v-else />
            </template>
          </a-avatar>
          <div class="header__avatar-name">
            {{ userInfo.name.length > 0 ? userInfo.name : "admin" }}
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="logout()">
              <template #icon><a-icon type="PoweroffOutlined" /></template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import aIcon from "@/components/aicon/aicon.vue";
import { useUser } from "@/stores/user";
import { useMenuStore } from "@/stores/menu";
import { watch, computed, onBeforeMount } from "vue";
import type { RouterObj, RouterTable } from "@/types/api/login";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
const userStore = useUser();
const menuStore = useMenuStore();
const { userInfo } = storeToRefs(userStore);
defineEmits(["update:collapsed"]);
defineProps<{
  collapsed: boolean;
}>();

const activeKey = computed(() => menuStore.menu.menuId);
const routers = computed(() => {
  return userStore.userInfo.routers?.filter((item: { hidden?: boolean }) => {
    return !item.hidden;
  });
});

// 退出登录
const logout = () => {
  userStore.logoutUser().then(() => {
    router.push("/login");
  });
};

// 切换tab
const tabClick = (e: number) => {
  const routers = userStore.userInfo.routers || [];
  let menuRouter: RouterTable = [];
  routers.forEach((item: RouterObj) => {
    if (item.id === e) {
      menuRouter = item.children || [];
    }
  });
  menuStore.setMenu(menuRouter);
  menuStore.setId(e);
};

watch(activeKey, () => {
  tabClick(activeKey.value);
});

onBeforeMount(() => {
  tabClick(activeKey.value);
});
</script>
<style lang="less" scoped>
.layout__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
  font-size: 20px;
  .header__left {
    display: flex;
    align-items: center;
    flex-grow: 1;
    .group__tabs {
      width: 500px;
      margin-left: 22px;
      margin-right: 22px;
      flex-grow: 1;
      :deep(.ant-tabs-nav) {
        margin-bottom: 0px !important;
      }
    }
  }

  .header__right {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    .header__avatar {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      .header__avatar-name {
        margin-left: 6px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
}
</style>
<style lang="less">
.layout__header {
  .header__left {
    .ant-tabs-bar {
      margin: 0;
      border: none;
    }
  }
}
</style>
