<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant'
import { ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'TabsView',
})

const route = useRoute()
const router = useRouter()
// 当前选择的 tab
const active = ref(route.name as string)
watch(active, (nv) => {
  router.push({
    name: nv,
  })
})
</script>

<template>
  <RouterView />
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
