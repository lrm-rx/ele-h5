<script setup lang="ts">
import type { ISearchRecomment } from '@/types'
import OpSearch from '@/components/OpSearch.vue'
import { ref } from 'vue'

interface IProps {
  recomments: ISearchRecomment[]
}

defineProps<IProps>()

const emits = defineEmits<IEmits>()
const searchValue = ref('123')
interface IEmits {
  (e: 'searchClick'): void
}
</script>

<template>
  <div class="home-top">
    <div class="top">
      <img class="location-icon" src="@/assets/imgs/index_page/location.png">
      <div class="location">
        平湖街道水门路135号
      </div>
      <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png">
      <img class="comments-icon" src="@/assets/imgs/index_page/comments.png">
    </div>
    <!-- <VanSearch
      shape="round"
      background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
      placeholder="世界茶饮 35减2"
    >
      <template #right-icon>
        <div>搜索</div>
      </template>
    </VanSearch> -->
    <VanSticky>
      <OpSearch
        v-model="searchValue"
        shape="round"
        background="linear-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243))"
        placeholder="世界茶饮 35减2"
        @input-click="emits('searchClick')"
      >
        <template #right-icon>
          <div @click="emits('searchClick')">
            搜索
          </div>
        </template>
      </OpSearch>
    </VanSticky>
    <div class="search-recommend">
      <div v-for="v in recomments" :key="v.value" class="tag">
        {{ v.label }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-top {
  color: white;
  background: linear-gradient(to right, rgb(53 200 250), rgb(31 175 243));

  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0;
    font-size: 15px;
    font-weight: bold;
    line-height: 15px;

    .location-icon {
      width: 20px;
      height: 20px;
    }

    .location {
      flex: 1;
    }

    .shopcart-icon {
      width: 24px;
      height: 24px;
    }

    .comments-icon {
      width: 28px;
      height: 24px;
      margin-left: 10px;
    }
  }

  .search-recommend {
    display: flex;
    padding: 0 10px 8px;

    .tag {
      padding: 2px 8px;
      margin-right: 10px;
      font-size: 12px;
      background: rgb(242 242 242 / 30%);
      border-radius: 10px;
    }
  }
}
</style>

<style lang="scss">
.home-top {
  .van-field__right-icon {
    margin-right: 0;
  }
}
</style>
