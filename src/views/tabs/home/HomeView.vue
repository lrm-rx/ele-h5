<script setup lang="ts">
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
</script>

<template>
  <div class="home-page">
    <SearchView v-if="isSearchViewShow" @cancel="toggleSearchView" />
    <TheTop :recomments @search-click="toggleSearchView" />
  </div>
</template>

<style>

</style>
