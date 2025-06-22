import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()],
        dts: "src/types/auto-imports.d.ts",
    }),
    Components({
        resolvers: [ElementPlusResolver()],
        dts: "src/types/components.d.ts",
    }),
  ],
  resolve: {
          alias: {
              "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
          }
      },
})
function ElementPlusResolver() {
    throw new Error('Function not implemented.')
}

function Components(arg0: { resolvers: void[]; dts: string }): import("vite").PluginOption {
    throw new Error('Function not implemented.')
}

function AutoImport(arg0: { imports: string[]; resolvers: void[]; dts: string }): import("vite").PluginOption {
    throw new Error('Function not implemented.')
}

function createSvgIconsPlugin(arg0: {
    // 指定需要缓存的图标文件夹
    iconDirs: string[]
    // 指定symbolId格式
    symbolId: string
}): import("vite").PluginOption {
    throw new Error('Function not implemented.')
}

