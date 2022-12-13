<template>
  <div class="footer">
    <div class="copyright">
      <a-icon type="copyright-outlined" />
      2019-2022
      <span>
        TRADE PLUS
        <a href="https://beian.miit.gov.cn/" target="_blank">
          沪ICP备2021030152号
        </a>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import aIcon from "@/components/aicon/aicon.vue";
</script>

<style lang="less" scoped>
.footer {
  margin: 16px 0;
  text-align: center;

  .copyright {
    color: #334681;
    font-size: 12px;
    a {
      color: #334681;
    }
  }
}
</style>
