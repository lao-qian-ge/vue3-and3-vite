<script setup lang="ts">
import type { Locale } from "ant-design-vue/es/locale-provider";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ref } from "vue";
import { RouterView } from "vue-router";

const locale = ref<Locale>(zhCN);
</script>

<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<style lang="less" scoped>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
