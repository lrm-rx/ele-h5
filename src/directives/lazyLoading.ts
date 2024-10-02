import type { App, DirectiveBinding } from 'vue'

function vLazy(observer: IntersectionObserver) {
  return {
    beforeMount(el: HTMLImageElement, binding: DirectiveBinding) {
      el.classList.add('op-lazyload')
      const { value } = binding
      // <img data-origin="" />
      el.dataset.origin = value
      observer.observe(el)
    },
  }
}
const lazyPlugin = {
  install(app: App) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          // 开始加载图片
          const el = item.target as HTMLImageElement
          el.src = el.dataset.origin as string
          el.classList.remove('op-lazyload')
          // 停止监听
          observer.unobserve(el)
        }
      })
    }, {
      // 交叉视图的 100px  才开始派发事件
      rootMargin: '0px 0px -100px 0px',
    })
    app.directive('lazy', vLazy(observer))
  },
}

export default lazyPlugin
