// interface IDebounceFn<T> {
//   (...args: T[]): void | Promise<void>
// }

// export function useDebounce<T>(fn: IDebounceFn<T>, delay: number) {
//   let timer: null | ReturnType<typeof setTimeout> = null
//   return function f(this: void, ...arg: T[]) {
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(() => {
//       fn.call(this, ...arg)
//     }, delay)
//   }
// }

import type { Ref, UnwrapRef } from 'vue'
import { onUnmounted, ref, watch } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number) {
  const debounceValue = ref(value.value)
  let timer: null | ReturnType<typeof setTimeout> = null

  const unwatch = watch(value, (nv) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debounceValue.value = nv as UnwrapRef<T>
    }, delay)
  })

  onUnmounted(() => {
    unwatch()
  })

  return debounceValue
}
