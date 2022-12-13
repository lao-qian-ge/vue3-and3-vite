<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script lang="ts" setup>
import { useTabs } from "@/stores/tabs";
import { storeToRefs } from "pinia";
const { includeList } = storeToRefs(useTabs());
</script>
