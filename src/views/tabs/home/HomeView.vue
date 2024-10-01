<script setup lang="ts">
import type { IHomeInfo } from '@/types'
import { fetchHomePageData } from '@/api/home'
import { useAsync } from '@/use/useAsync'
import { useToggle } from '@/use/useToggle'
import SearchView from '@/views/search/SearchView.vue'
import TheTop from './components/TheTop.vue'

const recomments = [
  {
    value: 1,
    label: '牛腩',
  },
  {
    value: 2,
    label: '炸坤',
  },
]

const [isSearchViewShow, toggleSearchView] = useToggle(false)
const { data, pending } = useAsync(fetchHomePageData, {} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <!-- isSearchViewShow 为 true 时, 这个组件在最顶层 -->
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView" />
    </Transition>

    <!-- 只做展示 -->
    <TheTop :recomments @search-click="toggleSearchView" />

    {{ data }}
    {{ pending }}
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
