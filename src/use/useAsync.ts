import { ref, type UnwrapRef } from 'vue'

export function useAsync<T>(asyncFn: () => Promise<T>, initialValue: T, immediate = true) {
  const pending = ref()
  const data = ref(initialValue)
  const error = ref(null)
  const execute = function () {
    pending.value = true
    error.value = null
    return asyncFn().then((res) => {
      data.value = res as UnwrapRef<T>
      pending.value = false
    }).catch((err) => {
      error.value = err
      pending.value = false
    })
  }
  immediate && execute()

  return {
    pending,
    data,
    error,
    execute,
  }
}
