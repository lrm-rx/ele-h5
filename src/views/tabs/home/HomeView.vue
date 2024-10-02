<script setup lang="ts">
import type { ICountdown, IHomeInfo } from '@/types'
import { fetchHomePageData } from '@/api/home'
import OpLoadingView from '@/components/OpLoadingView.vue'
import OpSwipe from '@/components/swipe/OpSwipe'
import OpSwipeItem from '@/components/swipe/OpSwipeItem'
import { PRIMARY_COLOR, TRANSPARENT } from '@/config'
import { useAsync } from '@/use/useAsync'
import { useToggle } from '@/use/useToggle'
import SearchView from '@/views/search/SearchView.vue'
import { ref } from 'vue'
import CountDown from './components/CountDown.vue'
import ScrollBar from './components/ScrollBar.vue'
import TheTop from './components/TheTop.vue'
import TheTransformer from './components/TheTransformer.vue'
import { HOME_TABS } from './config'

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

const tabBackgroundColor = ref(TRANSPARENT)

function onTabScroll({ isFixed }: { isFixed: boolean }) {
  tabBackgroundColor.value = isFixed ? 'white' : TRANSPARENT
}
</script>

<template>
  <div class="home-page">
    <Transition name="fade">
      <!-- isSearchViewShow 为 true 时, 这个组件在最顶层 -->
      <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView" />
    </Transition>
    <div v-show="!isSearchViewShow">
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
      <div class="home-page__activity">
        <CountDown v-if="data.countdown" :data="data.countdown" />
        <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
          <OpSwipeItem v-for="v in data.activities" :key="v">
            <img :src="v">
          </OpSwipeItem>
        </OpSwipe>
      </div>
      <VanTabs sticky offset-top="54px" :color="PRIMARY_COLOR" :background="tabBackgroundColor" @scroll="onTabScroll">
        <VanTab v-for="v in HOME_TABS" :key="v.value" :title="v.title">
          <component :is="v.component" />
        </VanTab>
      </VanTabs>
    </div>
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
