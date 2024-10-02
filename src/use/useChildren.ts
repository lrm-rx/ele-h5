import type { InjectionKey } from 'vue'
import type { ParentProvide } from './useParent'
import { provide, reactive } from 'vue'

export type Child = Record<string, any>

export function useChildren<T>(key: InjectionKey<ParentProvide<T>>) {
  const children = reactive<Child[]>([]) // 明确指定类型为 NotNullChild[]

  const linkChildren = (value?: T) => {
    const link = (child: Child) => {
      children.push(child)
    }

    const unlink = (child: Child) => {
      const index = children.indexOf(child)
      if (index !== -1) {
        children.splice(index, 1)
      }
    }

    provide(key, {
      link,
      unlink,
      ...value,
    } as ParentProvide<T>)
  }

  return {
    children,
    linkChildren,
  }
}
