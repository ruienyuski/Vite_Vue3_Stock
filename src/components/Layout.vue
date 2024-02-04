<script setup>
import { ref } from "vue";
import {
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutFooter,
  NMessageProvider,
} from "naive-ui";
import Form from "./Form.vue";
import Products from "./Products.vue";
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-layout-header bordered>
        商店庫存系統
      </n-layout-header>
      <n-layout has-sider>
        <n-layout-sider
          bordered
          content-style="padding: 16px;"
          style="height: calc(100vh - 47px)"
          width="320"
        >
          <n-message-provider>
            <Form />
          </n-message-provider>
        </n-layout-sider>
        <n-layout style="height: calc(100vh - 47px)">
          <n-message-provider>
            <Products />
          </n-message-provider>
        </n-layout>
      </n-layout>
      <n-layout-footer bordered>
        Footer Footer Footer
      </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<style scoped>
</style>
