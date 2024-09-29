<script setup lang="ts">
interface IEmits {
  (e: 'cancel'): void
}
const emits = defineEmits<IEmits>()
</script>

<template>
  <div class="search-view" @click="emits('cancel')">
    vue
  </div>
</template>

<style lang="scss" scoped>
.search-view {
  position: absolute;
  inset: 0;
  z-index: 999;
  background-color: white;

  &__history {
    padding: var(--van-padding-sm);

    .label {
      margin-bottom: var(--van-padding-xs);
    }

    .history-tag {
      display: inline-block;
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
      font-size: 12px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      border-radius: 10px;
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 12px;
      border-radius: 1px solid var(--van-gray-1);

      .name {
        flex: 1;
        padding-left: 6px;
      }

      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }

    .no-result,
    .searching {
      padding: 100px 0;
      font-size: 12px;
      color: var(--van-gray-6);
      text-align: center;
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
