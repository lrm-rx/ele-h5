/// <reference types="vite/client" />

import type { VNode } from 'vue'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare type VueNode = VNode
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: unknown
    }
  }
}
