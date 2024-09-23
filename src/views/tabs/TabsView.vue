<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant'
import { ref } from 'vue'

defineOptions({
  name: 'TabsView',
})
// 当前选择的 tab
const active = ref('home')
</script>

<template>
  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">
      首页
    </TabbarItem>
    <TabbarItem name="order" icon="bars">
      订单
    </TabbarItem>
    <TabbarItem name="me" icon="contact">
      首页
    </TabbarItem>
  </Tabbar>
</template>
