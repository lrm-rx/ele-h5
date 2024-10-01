<script setup lang="ts">
interface IProps {
  showAction?: boolean
  background?: string
  placeholder?: string
  shape?: string
  modelValue?: string | number
}
const props = defineProps<IProps>()

// interface IEmits {
//   (e: 'search', v?: string | number): void
//   (e: 'cancel'): void
//   (e: 'clear'): void
//   (e: 'update:modelValue', v?: string | number): void
// }

const emits = defineEmits<{
  'search': [v?: string | number]
  'cancel': []
  'clear': []
  'update:modelValue': [v?: string | number]
  'inputClick': []
}>()

const searchValue = defineModel<string | number>()

function onKeypress(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    e.preventDefault()
    emits('search', props.modelValue)
  }
}

function onClear() {
  searchValue.value = ''
  emits('clear')
}
</script>

<template>
  <div class="op-search" :class="{ 'op-search--show-action': showAction }" :style="{ background }">
    <div class="op-search__content" :class="shape ? `op-search__content--${shape}` : ''">
      <div class="op-cell op-search__field">
        <div class="op-field__left-icon">
          <VanIcon name="search" />
        </div>
        <div class="op-cell__value">
          <div class="op-field__body">
            <input
              type="search" class="op-field__control" :value="searchValue" :placeholder
              @keypress="onKeypress"
              @click="emits('inputClick')"
              @input="(e) => { searchValue = (e.target as HTMLInputElement).value }"
            >
            <div v-if="$slots['right-icon']" class="op-field__right-icon">
              <slot name="right-icon" />
            </div>
            <VanIcon v-else-if="searchValue" name="close" class="op-field__clear" @click="onClear" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAction" class="op-search__action">
      <slot name="action">
        <div @click="emits('cancel')">
          取消
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --op-search-padding: 10px var(--van-padding-sm);
  --op-search-background-color: var(--van-background-color-light);
  --op-search-content-background: var(--van-gray-1);
  --op-search-left-icon-color: var(--van-gray-6);
  --op-search-action-padding: 0 var(--van-padding-xs);
  --op-search-action-text-color: var(--van-text-color);
  --op-search-action-font-size: var(--van-font-size-md);
  --op-search-input-height: 34px;
}

.op-search {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: var(--op-search-padding);
  background: var(--op-search-background-color);

  &--show-action {
    padding-right: 0;
  }

  &__content {
    display: flex;
    flex: 1;
    padding-left: var(--van-padding-sm);
    background: var(--op-search-content-background);
    border-radius: var(--van-border-radius-sm);

    &--round {
      border-radius: var(--van-radius-max);
    }
  }

  &__action {
    padding: var(--op-search-action-padding);
    font-size: var(--op-search-action-font-size);
    line-height: var(--op-search-input-height);
    color: var(--op-search-action-text-color);
    cursor: pointer;
    user-select: none;
  }

  &__field {
    flex: 1;
    padding: 5px var(--van-padding-xs) 5px 0;
    background-color: transparent;

    .op-field__left-icon {
      margin-right: var(--van-padding-base);
      color: var(--op-search-left-icon-color);

      .van-icon {
        font-size: var(--van-field-icon-size);
      }
    }
  }
}

.op-cell {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  font-size: var(--van-cell-font-size);
  line-height: var(--van-cell-line-height);
  color: var(--van-cell-text-color);

  &__value {
    flex: 1;
    color: var(--van-cell-text-color);
    word-wrap: break-word;
    vertical-align: middle;
  }
}

.op-field {
  &__control {
    box-sizing: border-box;
    display: block;
    width: 100%;
    min-width: 0;
    padding: 0;
    margin: 0;
    line-height: inherit;
    color: var(--van-field-input-text-color);
    text-align: left;
    resize: none;
    user-select: none;
    background-color: transparent;
    border: 0;

    &::placeholder {
      color: var(--van-field-placeholder-text-color);
    }
  }

  &__body {
    display: flex;
    align-items: center;
  }

  &__right-icon {
    flex-shrink: 0;
    padding: 0 var(--van-padding-xs);
    line-height: inherit;
    color: var(--van-field-right-icon-color);
  }

  &__clear {
    font-size: var(--van-field-clear-icon-size) !important;
    color: var(--van-field-clear-icon-color);
    cursor: pointer;
  }
}

input {
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
}
</style>
