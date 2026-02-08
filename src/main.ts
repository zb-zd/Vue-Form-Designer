import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { i18n } from './locales'
import { useComponentRegistryStore } from './stores/componentRegistry'
import { fieldMetas } from './components/fields'

const app = createApp(App)

// Register Pinia
const pinia = createPinia()
app.use(pinia)

// Register i18n
app.use(i18n)

// Register Element Plus
app.use(ElementPlus)

// Register Element Plus Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Register field components
const componentRegistry = useComponentRegistryStore()
fieldMetas.forEach(meta => {
  componentRegistry.register(meta)
})

app.mount('#app')
