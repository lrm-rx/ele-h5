import { createPinia } from 'pinia'
import {
  Button,
  CellGroup,
  Field,
  Form,
  Icon,
  Loading,
  NavBar,
  Search,
  Skeleton,
  Sticky,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
} from 'vant'
import { createApp } from 'vue'
import App from './App.vue'
import lazyPlugin from './directives/lazyLoading'
import router from './router'
import 'vant/lib/index.css'
import './assets/common.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(Icon)
app.use(Loading)
app.use(Skeleton)
app.use(Tabs)
app.use(Tab)
app.use(Sticky)
app.use(NavBar)
app.use(Form)
app.use(CellGroup)
app.use(Field)
app.use(Button)
app.use(lazyPlugin)

const rootValue = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = `${(deviceWidth * rootValue) / rootWidth}px`
app.mount('#app')
