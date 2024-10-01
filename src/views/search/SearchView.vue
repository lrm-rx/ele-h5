<script setup lang="ts">
import type { ISearchResult } from '@/types'
import { fetchSearchData } from '@/api/search'
import OpSearch from '@/components/OpSearch.vue'
import { useToggle } from '@/use/useToggle'
import { computed, ref, watch } from 'vue'

const emits = defineEmits<IEmits>()

const HISTORY_TAG = ['比萨', '栗子', '切果NOW', '炒饭', '出前一丁', '玉米', '牛腩', '土豆焗饭', '烧烤', '水果']

interface IEmits {
  (e: 'cancel'): void
}

const [isHistoryTagShow, toggleHistoryTag] = useToggle(false)

const historyTags = computed(() => isHistoryTagShow.value ? HISTORY_TAG : HISTORY_TAG.slice(0, 5))
const searchValue = ref('')
const searchResult = ref<ISearchResult[]>([])
const [INIT, DONE, DOING] = [-1, 0, 1]
const searchState = ref(INIT)
async function onSearch(v?: string | number) {
  try {
    searchState.value = DOING
    const { list } = await fetchSearchData(v as string)
    searchResult.value = list
  }
  finally {
    searchState.value = DONE
  }
}
function onTagClick(v: string) {
  searchValue.value = v
  onSearch(v)
}
watch(searchValue, (nv) => {
  if (!nv) {
    searchResult.value = []
  }
  onSearch(nv)
})
</script>

<template>
  <div class="search-view">
    <OpSearch
      v-model="searchValue" show-action shape="round" placeholder="请输入搜索关键词" @search="onSearch"
      @cancel="emits('cancel')"
    />
    <div v-if="!searchValue" class="search-view__history">
      <div class="label">
        历史搜索
      </div>
      <TransitionGroup name="list">
        <div v-for="v in historyTags" :key="v" class="history-tag" @click="onTagClick(v)">
          {{ v }}
        </div>
        <div key="arrow" class="history-tag" @click="toggleHistoryTag">
          <VanIcon v-if="isHistoryTagShow" name="arrow-up" />
          <VanIcon v-else name="arrow-down" />
        </div>
      </TransitionGroup>
    </div>
    <div v-else class="search-view__result">
      <div v-if="searchState === DOING" class="searching">
        正在搜索...
      </div>
      <template v-if="searchState === DONE">
        <div v-for="v in searchResult" :key="v.label" class="result-item">
          <VanIcon name="search" />
          <div class="name">
            {{ v.label }}
          </div>
          <div class="count">
            约{{ v.resultCount }}个结果
          </div>
        </div>
        <div v-if="!searchResult.length" class="no-result">
          暂无推荐
        </div>
      </template>
    </div>
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
