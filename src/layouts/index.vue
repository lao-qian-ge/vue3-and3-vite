<template>
  <a-layout class="layout">
    <!-- 侧边 -->
    <a-layout-sider
      width="256"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <layout-menu :collapsed="collapsed" />
    </a-layout-sider>

    <a-layout>
      <!-- 头部 -->
      <a-layout-header class="header">
        <layout-header v-model:collapsed="collapsed" />
      </a-layout-header>

      <!-- 内容 -->
      <a-layout-content class="container">
        <layout-tabs />
      </a-layout-content>
      <a-layout-footer class="footer">
        <layoutFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import layoutMenu from "@/layouts/menu/menu.vue";
import layoutTabs from "@/layouts/tabs/tabs.vue";
import layoutHeader from "@/layouts/header/header.vue";
import layoutFooter from "@/layouts/footer/footer.vue";
const collapsed = ref<boolean>(false);
</script>
<style lang="less" scoped>
.layout {
  overflow: hidden;
  height: 100vh;
  .header {
    background-color: #fff;
    padding: 0;
  }
  .container {
    padding: 8px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .container::-webkit-scrollbar {
    width: 6px;
  }
  .container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #c1c1c1;
  }
  .container::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
}
</style>
<style lang="less">
.layout {
  .ant-layout-sider-children {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ant-layout-sider-children::-webkit-scrollbar {
    width: 4px;
  }
  .ant-layout-sider-children::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #535353;
  }
  .ant-layout-sider-children::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d8d8d8;
    background: #ededed;
  }
  .footer.ant-layout-footer {
    padding: 0 !important;
  }
}
</style>
