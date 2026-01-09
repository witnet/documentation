import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import ExternalLinkButton from './components/ExternalLinkButton.vue'
import InternalLinkButton from './components/InternalLinkButton.vue'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    enhanceAppWithTabs(ctx.app)
    ctx.app.component('ExternalLinkButton', ExternalLinkButton)
    ctx.app.component('InternalLinkButton', InternalLinkButton)
  }
}
