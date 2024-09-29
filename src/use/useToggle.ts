import { type Ref, ref } from 'vue'

export function useToggle(initialState: boolean): [Ref<boolean>, () => void] {
  const state = ref(initialState)
  const toggle = function () {
    state.value = !state.value
  }
  return [state, toggle]
}
