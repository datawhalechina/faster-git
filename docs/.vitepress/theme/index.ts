import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { App } from 'vue'
import { useRoute } from 'vitepress'
import type { Theme } from 'vitepress'

// 引入样式
import 'vitepress-markdown-timeline/dist/theme/index.css' // 时间线样式
import 'viewerjs/dist/viewer.min.css' // 图片查看器样式
import './custom.css' // 自定义样式

// 引入组件和插件
import ReadingProgress from './components/ReadingProgress.vue' // 阅读进度圈组件(vuepress同款)
import imageViewer from 'vitepress-plugin-image-viewer' // 图片查看器插件


export default {
  extends: DefaultTheme,

  // 布局扩展
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 添加阅读进度圈组件
      'layout-bottom': () => h(ReadingProgress),
      
      // 在文章底部添加反馈与 GitHub Star 按钮
      'doc-after': () => {
        return h('div', { class: 'feedback-tip' }, [
          h('strong', null, 'Feedback 反馈与建议：'),
          'Questions or Suggestions? Welcome to the ',
          h(
            'a',
            {
              href: 'https://github.com/datawhalechina/faster-git/issues',
              target: '_blank',
              rel: 'noopener noreferrer'
            },
            h('strong', null, 'Issue 议题💫'),
          ),
          h('div', { class: 'feedback-actions' }, [
            h('strong', null, 'Star 点个⭐️：'),
            h('span', { class: 'github-star-wrap' }, [
              h('iframe', {
                class: 'github-star-btn',
                src: 'https://ghbtns.com/github-btn.html?user=datawhalechina&repo=faster-git&type=star&count=true&size=large',
                title: 'GitHub',
                height: 30,
                width: 170,
              })
            ])
          ])
        ])
      }
    })
  },

  // 增强应用实例（预留扩展）
  enhanceApp({ app }: { app: App }) {
    // 图片查看器通过 setup 中的 imageViewer 自动为所有图片添加预览功能
    // 如需注册其他全局组件，可在此处添加
    // 例如：app.component('ComponentName', Component)
  },

  // 设置钩子
  setup() {
    const route = useRoute()
    
    // 启用图片查看器插件，自动为文档中的所有图片添加点击预览功能
    imageViewer(route, '.vp-doc', {
      toolbar: {
        zoomIn: 4,      // 放大
        zoomOut: 4,     // 缩小
        oneToOne: 4,    // 1:1 显示
        reset: 4,       // 重置
        prev: 4,        // 上一张
        next: 4,        // 下一张
      },
    })
  }
} satisfies Theme
