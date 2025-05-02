import { defineConfig } from 'vitepress';
import { useSidebar } from 'vitepress-openapi'
import spec from '../public/openapi.json' with { type: 'json' }

const sidebar = useSidebar({
  spec,
  // Optionally, you can specify a link prefix for all generated sidebar items.
  linkPrefix: '/operations/',
})

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-es',
  title: 'ToqueaValidation Api',
  description: 'Generate documentation from OpenAPI specifications.',

  themeConfig: {
    siteTitle: 'Toquea Validation Api',
    nav: [{ text: 'API Reference', link: '/introduction' }],

    sidebar: [
      { text: 'Introducción', link: '/introduction'},
      {
        text: 'Operaciones',
        items: [
          ...sidebar.generateSidebarGroups(),
        ],
      },
      {
        text: 'Webhooks',
        items: [
          { text: 'Resultado de validación', link: '/webhooks/id-validation-result' }
        ]
      }
      /*{
        text: 'One Page',
        items: [
          { text: 'One Page', link: '/one-page' },
          { text: 'Without Sidebar', link: '/without-sidebar' },
        ],
      },*/
    ],
  },

  base: '/doc-toquea-validation-public/'
});
