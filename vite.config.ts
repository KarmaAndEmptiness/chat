import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import autoImport from "unplugin-auto-import/vite";
import autoComponents from "unplugin-vue-components/vite";
import { resolve } from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue(),
      autoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [ElementPlusResolver()],
        dts: true,
      }),
      autoComponents({ resolvers: [ElementPlusResolver()], dts: true }),
    ],
  };
});
