<script setup lang="ts">
import type { ICountdown, IHomeInfo } from '@/types'
import { fetchHomePageData } from '@/api/home'
import OpLoadingView from '@/components/OpLoadingView.vue'
import { useAsync } from '@/use/useAsync'
import { useToggle } from '@/use/useToggle'
import SearchView from '@/views/search/SearchView.vue'
import ScrollBar from './components/ScrollBar.vue'
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'

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
const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: [],
} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <!-- isSearchViewShow 为 true 时, 这个组件在最顶层 -->
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView" />
    </Transition>

    <!-- 只做展示 -->
    <TheTop :recomments @search-click="toggleSearchView" />
    <OpLoadingView :loading="pending" type="skeleton">
      <div class="home-page__banner">
        <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl">
      </div>
      <TheTransformer :data="data.transformer" />
    </OpLoadingView>
    <!-- 需要加上v-if -->
    <ScrollBar v-if="data.scrollBarInfoList.length" :data="data.scrollBarInfoList" />
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

.home-page {
  padding-bottom: 70px;
  background: var(--op-gray-bg-color);

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }

  &__activity {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px;

    &__swipe {
      width: 180px;
      height: 170px;
      border-radius: 8px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
