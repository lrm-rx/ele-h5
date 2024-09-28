<script setup lang="ts">
import { fetchTest } from '@/api/test'
import { RouterView } from 'vue-router'

fetchTest()
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
