<script setup lang="ts">
import { fetchTest } from '@/api/test'
import { RouterView } from 'vue-router'

fetchTest()
</script>

<template>
  <RouterView />
</template>

<style>
@import 'normalize.css';

#app {
  font-size: 14px;
  color: #2c3e50;

  /** 字体抗锯齿，让字体看起来更清晰 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
