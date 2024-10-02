<script setup lang="ts">
import type { IShop } from '@/types'
import { fetchShopList } from '@/api/shop'
import OpList from '@/components/list/OpList'
import { ref } from 'vue'

const page = 1
const shopList = ref<IShop[]>([])
const loading = ref(false)
const finished = ref(false)

async function onLoad() {
  const { data, total } = await fetchShopList({
    _page: page,
    _limit: 5,
  })
  shopList.value.push(...data)
  loading.value = false
  if (shopList.value.length >= total) {
    finished.value = true
  }
}
</script>

<template>
  <div class="home-shop-list">
    <OpList v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="v in shopList" :key="v.id" style="height: 100px">
        {{ v.shopName }}
      </div>
    </OpList>
  </div>
</template>

<style lang="scss" scoped>
.home-shop-list {
  padding: 8px 10px;
}
</style>
